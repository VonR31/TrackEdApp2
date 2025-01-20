from fastapi import FastAPI, HTTPException, Depends, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import model
from passlib.context import CryptContext
from jose import JWTError, jwt
from enum import Enum
import qrcode
import io
import uuid
import base64
import uvicorn

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model.Base.metadata.create_all(bind=engine)

#AUTHENTICATION CONFIGURATION
SECRET_KEY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
ALGORITHM = 'HS256'

bcrpyt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/auth/token')

# Role ENUM
class RoleType(str, Enum):
    admin = 'admin'
    teacher = 'teacher'
    student = 'student'

#Section Enum
class SectionEnum(str,Enum):
    A = 'A'
    B = 'B'
    C = 'C'

# Student Model
class student(BaseModel):
    student_name: str
    student_class: str
    registered: bool

# Class Course Model
class class_course(BaseModel):
    course_name: str
    pre_requisite: str
    units: float
    course_detail: str
    class_status: bool

# Subject Model
class subject(BaseModel):
    subject_name: str
    subject_code: str
    subject_status: bool

# Attendance Model
class attendance(BaseModel):
    course_id: str
    time_end: datetime

# Student Attendance Model
class student_attendance(BaseModel):
    attendance_id: str
    student_id: str
    qr_pass: str

# Create User Admin
class CreateUserAdmin(BaseModel):
    first_name: str
    last_name: str
    role: RoleType
    username: str
    password: str

#Create Student Teacher ACC
class CreateStudent(BaseModel):
    first_name: str
    last_name: str
    role:RoleType
    section_id: str
    program_id: str
    username: str
    password: str

class CreateTeacher(BaseModel):
    first_name: str
    last_name: str
    role:RoleType
    program_id: str
    username: str
    password: str


class CourseAttend(BaseModel):
    course_id: str
    student_id: str

class CreateProgram(BaseModel):
    program_name: str 
    program_details: str
    req_credits: int

# Token Model
class Token(BaseModel):
    access_token: str
    token_type: str

#login Model
class Login(BaseModel): 
    username: str
    password: str

#Create Section Model
class CreateSection(BaseModel):
    section_name: SectionEnum
    program_id: str
    teacher_id: str
    current_student: int


# Get Database 
def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        if db is not None:
            db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# Attendance, QR scan, and QR CRUD
# --------------------------------------------
@app.get("/attendance_time/{attendance_id}/", status_code=status.HTTP_200_OK)
async def get_qr_time(attendance_id: str, db: db_dependency):
    attendance = db.query(model.Attendance).filter(model.Attendance.attendance_id == attendance_id).first()
    if attendance == None: 
        raise HTTPException(status_code=404, detail="This attendance does not exist!") 
    
    if datetime.now() > attendance.time_end:
        raise HTTPException(status_code=403, detail="Time has already passed!")
    
    duration = attendance.time_end - datetime.now()
    time_split = str(duration).split(":")
    hour = int(time_split[0])*3600
    minutes = int(time_split[1])*60
    seconds = time_split[2].split(".")
    seconds = int(seconds[0])

    print(duration)

    total_time = hour+minutes+seconds 
    
    return JSONResponse({"message": total_time}, status_code=200)

@app.post("/student/attendcourse", status_code=status.HTTP_201_CREATED)
async def course_attended(course_attend: CourseAttend, db: db_dependency ):
    course_id = course_attend.course_id
    student_id = course_attend.student_id

    get_courseId = db.query(model.Course).filter(model.Course.course_id == course_id).first()
    get_studentId = db.query(model.Student).filter(model.Student.student_id == student_id).first()

    if get_courseId is None: 
        raise HTTPException(status_code=404, detail="This course does not exist!") 
    
    if get_studentId is None: 
        raise HTTPException(status_code=404, detail="There student does not exist") 
    
    student_attended_course = db.query(model.CourseAttend).filter(model.CourseAttend.student_id == student_id)
    if student_attended_course is not None: 
        raise HTTPException(status_code=403, detail="Student is already in this course")

    course_attend = model.CourseAttend(
        course_id = course_id,
        student_id = student_id,
        midterm_grade = 0,
        final_grade =0,
        total_grade=0,
        gpa=0,
    )

    db.add(course_attend)
    db.commit()

    return {"message": "Course attended successfully!"}

#START
#Generate QR
#----------------------------------------------
@app.post("/qr/", status_code=status.HTTP_201_CREATED)
async def create_qr(attendance:attendance,db: db_dependency): 
    attendance_id = str(uuid.uuid4())
    qr_name = str(uuid.uuid4())
    course_id = attendance.course_id
    time_end = attendance.time_end

    attended_students = db.query(model.CourseAttend).filter(model.CourseAttend.course_id == course_id).all()

    for i in attended_students:
      new_students_list =  model.StudentAttendance(  
        attendance_id = attendance_id,
        student_id = i.student_id,
        status = "Absent",
        time_scanned = datetime.now()
        )
      db.add(new_students_list)
      db.commit()
      
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    qr.add_data(qr_name)
    qr.make(fit=True)

    # Create the QR image in memory
    img = qr.make_image(fill_color="black", back_color="white")
    img_io = io.BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    buffer = base64.b64encode(img_io.read()).decode('utf-8')
    qr_png = f'data:image/png;base64,{buffer}'

    current_time = datetime.now()

    if current_time > attendance.time_end:
        raise HTTPException(status_code=406, detail="Time end does not exist!")
    
    db_attendance = model.Attendance(
        attendance_id = attendance_id,
        qr_png = qr_png,
        qr_name=qr_name,
        course_id=course_id,
        time_start= current_time, 
        time_end= time_end,
        attendance_status=True,
    )

    db.add(db_attendance) 
    db.commit()

    return {"message": "Created qr successfully!"}

#Getting QR for Teacher
#------------------------------------------------------------
@app.get('/get_qr/{attendance_id}', status_code=status.HTTP_200_OK)
async def fetch_qr(attendance_id:str, db:db_dependency):
    get_qr = db.query(model.Attendance).filter(model.Attendance.attendance_id == attendance_id).first()
    if get_qr == None:
        raise HTTPException(status_code=404, detail="QR code not found")

    return {"qr": get_qr}
#END

# Scan QR  
#-------------------------------------------------------------
@app.post('/scan_qr', status_code=status.HTTP_202_ACCEPTED)
async def scan_qr(student_attendance:student_attendance, db: db_dependency):

    get_qr = db.query(model.Attendance).filter(model.Attendance.attendance_id == student_attendance.attendance_id).first()

    if get_qr is None:
        raise HTTPException(status_code=404, detail="There is no such attendance in that id")
    
    get_student = db.query(model.StudentAttendance).filter(model.StudentAttendance == student_attendance.student_id).first()

    if get_student is None:
        raise HTTPException(status_code=404, detail="There is no student with this id")

    if datetime.now() > attendance.time_end > attendance.time_end + datetime.time(0, 30, 0): 
        attend_student = model.StudentAttendance(
            studentattendance_id = str(uuid.uuid4()),
            attendance_id=student_attendance.attendance_id,
            student_id=student_attendance.student_id,
            status="Late",
            time_scanned=datetime.now()
        ) 

        db.add(attend_student)
        db.commit()
        raise HTTPException(status_code=403, detail="Scanned Failed, time already passed!")

    attend_student = model.StudentAttendance(
        studentattendance_id = str(uuid.uuid4()),
        attendance_id=student_attendance.attendance_id,
        student_id=student_attendance.student_id,
        status="Present",
        time_scanned=datetime.now()
    )

    db.add(attend_student)
    db.commit()
    
    return {'message': 'Scanned Successfully'}


#Create Program
#--------------------------------
@app.post("/program/create", status_code=status.HTTP_201_CREATED)
async def create_department(program: CreateProgram, db: db_dependency):

    program_id = str(uuid.uuid4())
    program_name = program.program_name
    program_details = program.program_details
    req_credits = program.req_credits

    new_program = model.Program(
        program_id=program_id,
        program_name=program_name,
        program_details=program_details,
        req_credits=req_credits
    )

    db.add(new_program)
    db.commit()

    return {"message": "Successfully created program"} 
    
# User CRUD and Authentication 
# ----------------------------------------------------
# Create User/Student
@app.post("/create/user/student", status_code=status.HTTP_201_CREATED)
async def create_user_student(create_student:CreateStudent , db: Session = Depends(get_db)):

    user_id = str(uuid.uuid4())
    program_id = create_student.program_id
    password=bcrpyt_context.hash(create_student.password)

    if program_id is None:
        raise HTTPException(status_code=404, detail="There is no student with this id")

    # Create common user record
    create_user_model = model.User(
        user_id=user_id,
        firstname=create_student.first_name,
        lastname=create_student.last_name,
        role=create_student.role,
        username=create_student.username,
        password=password
    )

    # Add the common user to the User table
    db.add(create_user_model)
    db.commit()

    # Custom Student ID
    def get_last_id_student():
        qry = db.query(model.Student).order_by(model.Student.student_id.desc()).first()
        
        if qry is None:
            # If no students are present, start with the current year/month followed by "001"
            ym = datetime.now().strftime("%y%m")
            q_custom_id = ym + "001"
            return q_custom_id
        else:
            # Extract the year/month part and increment the numerical part
            last_student_id = qry.student_id
            ym = datetime.now().strftime("%y%m")
            
            # Ensure the student_id starts with the correct year/month prefix
            if last_student_id[:4] == ym:
                # Increment the numerical part
                numerical_part = int(last_student_id[4:]) + 1
            else:
                # If the year/month changed, reset the numerical part to 1
                numerical_part = 1
            
            # Format the new ID with leading zeros for the numerical part
            q_custom_id = ym + str(numerical_part).zfill(3)
            return q_custom_id
    
    # Add user to corresponding role-based table
    if create_student.role == RoleType.student  :
        student = model.Student(
            student_id= get_last_id_student(), #Output example: 2501001++
            user_id=user_id,
            program_id=program_id,
            section_id=create_student.section_id,
            current_gpa=0.0,
            gpax=0.0,
            credits=0.0,
            level='None', #Default Value
            number_course=0,
            student_status="Active"  # Default status
        )
        db.add(student)
        db.commit()
    else:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    return {"message": "Successfully created a user"}
    

#Create User/Teacher
@app.post("/create/user/teacher", status_code=status.HTTP_201_CREATED)
async def create_user_teacher(create_teacher: CreateTeacher, db: Session = Depends(get_db)):
    
    user_id = str(uuid.uuid4())
    password = bcrpyt_context.hash(create_teacher.password)

    create_user_request = model.User(
    user_id=user_id,
    firstname=create_teacher.first_name,
    lastname=create_teacher.last_name,
    role=create_teacher.role,
    username=create_teacher.username,
    password=password
    )

    db.add(create_user_request)
    db.commit()

 #Custom Teacher ID
    def get_last_id_teacher():
        qry = db.query(model.Teacher).order_by(model.Teacher.teacher_id.desc()).first()

        if qry is None:
            # If no teacher records exist, start with the current year/month followed by "-0100"
            ym = datetime.now().strftime("%Y")  # Use full year for output like "2025"
            q_custom_id = f"{ym}-0100"
            return q_custom_id
        else:
            # Extract the last teacher ID
            last_teacher_id = qry.teacher_id
            ym = datetime.now().strftime("%Y")  # Ensure to use the current year

            # Ensure the teacher ID starts with the correct year prefix
            if last_teacher_id[:4] == ym:
                # Increment the numerical part
                numerical_part = int(last_teacher_id[5:]) + 1
            else:
                # If the year changed, reset the numerical part to 100
                numerical_part = 100
            
            # Format the new ID with the correct year and leading zeros for the numerical part
            q_custom_id = f"{ym}-{str(numerical_part).zfill(4)}"
            return q_custom_id  


    if create_user_request.role == RoleType.teacher:
        teacher = model.Teacher(
            teacher_id=get_last_id_teacher(),
            user_id=user_id,
            title="N/A",  # Default title
            num_course_owned=0,
        )
        db.add(teacher)
        db.commit()

    else:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    return {"message": "Successfully created a user"}


#Create User/Admin
@app.post("/create/admin", status_code=status.HTTP_201_CREATED)
async def create_user_admin(create_user_admin: CreateUserAdmin, db: Session = Depends(get_db)):

    user_id = str(uuid.uuid4())
    roleAdmin = RoleType.admin
    password=bcrpyt_context.hash(create_user_admin.password)

    new_admin= model.User(
        user_id=user_id,
        firstname=create_user_admin.first_name,
        lastname=create_user_admin.last_name,
        role=roleAdmin,
        username=create_user_admin.username,
        password=password
    )
    db.add(new_admin)
    db.commit()

    if create_user_admin.role == RoleType.admin:
        admin = model.Admin(
            admin_id=user_id,
            user_id=user_id
            # You can add more fields if necessary
        )
        db.add(admin)
        db.commit()

    else:
        raise HTTPException(status_code=400, detail="Invalid role")
        

    

#Create Course 
#----------------------------------------------------
@app.post("/course/create", status_code=status.HTTP_201_CREATED)
async def create_course(course: class_course, db: db_dependency):

    course_id = str(uuid.uuid4())   
    course_status = True
    
    db_course = model.Course(
        course_id = course_id,
        pre_requisite = course.pre_requisite,
        course_name = course.course_name,
        units = course.units,
        course_detail = course.course_detail,
        course_status = course_status
    )

    db.add(db_course)
    db.commit()

    return {"message": "Created course successfully"}

#Getting Course
#------------------------------------------------------------
@app.get("/course/{course_id}", status_code=status.HTTP_200_OK)
async def fetch_course(course_id: str, db: db_dependency):
    get_course = db.query(model.Course).filter(model.Course.course_id == course_id).first()

    if get_course == None:
        raise HTTPException(status_code=404, detail="Course not found")

    return {"course": get_course}

#Create Section
#---------------------------------------------------------
@app.post("/section/create", status_code=status.HTTP_201_CREATED)
async def create_section(section: CreateSection, db: db_dependency):

    section_id = str(uuid.uuid4())

    current_student = 'N/A' #Default Value

    db_new_section = model.Section(
    section_id = section_id,
    section_name = SectionEnum.A, #Default Value
    program_id = section.program_id,
    teacher_id = section.teacher_id,
    current_student = current_student
    )

    db.add(db_new_section)
    db.commit()


#Authentication
#-------------------------------------
@app.post("/login", status_code=status.HTTP_202_ACCEPTED)
async def login_for_access_token(form_data: Login, db:db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could Not Validate User')
    
    token = create_access_token(user.username, user.user_id, user.role, timedelta(minutes=20))
    return{"access_token": token, "token_type": "bearer"}

#Authenticate User
def authenticate_user(username: str, password: str, db):
    user = db.query(model.User).filter(model.User.username == username).first()

    if not user: 
        return False
    if not bcrpyt_context.verify(password, user.password):
        return False
    return user

#Create Access Token
def create_access_token(username: str, user_id: int, role: RoleType,expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id, 'roleType': role}
    expires = datetime.now() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

#Check user authentication after token expires
#-------------------------------------
@app.get("/verif", status_code=status.HTTP_202_ACCEPTED)
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception 
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not valid or token has expired')

    return {"message": "User is still authenticated", "auth": True}

#Protected Route for Backend
#-------------------------------------
def isAuth(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception 
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User is not valid or token has expired')

    return {"message": "User is still authenticated", "auth": True}



if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)