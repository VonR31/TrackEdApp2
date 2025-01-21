from enum import Enum
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import distinct, func
from routes.auth import isAuthorized
import model
import uuid
from database import db_dependency

admin_router = APIRouter(prefix="/admin", tags=['admin'])

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
    course_code: str
    program_id: str
    units: float
    course_detail: str
    class_status: bool

# Subject Model
class subject(BaseModel):
    subject_name: str
    subject_code: str
    subject_status: bool

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

#Create Section Model
class CreateSection(BaseModel):
    section_name: SectionEnum
    program_id: str
    teacher_id: str
    current_student: int

class EditCourse(BaseModel):
    course_name: str
    course_code: str
    program_id: str
    units: float
    course_detail: str

class UpdateStudent(BaseModel): #Student Edit From the Admin Dashboard
    program_id: str
    section_id: str
    level: int
    name: str #first and last name from the user table separate rows
    email: str #username from the user table


@admin_router.post("/student/attendcourse", status_code=status.HTTP_201_CREATED)
async def course_attended(course_attend: CourseAttend, role: Annotated[str, Depends(isAuthorized)], db: db_dependency ):
    if role != "admin": 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not authorized to do this action!")
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


#CRUD Program
#--------------------------------
@admin_router.post("/program/create", status_code=status.HTTP_201_CREATED)
async def create_department(program: CreateProgram, db: db_dependency):
    # if role != "admin": 
    #     raise HTTPException(status_code=403, detail="You are not authorized to do this action")

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


#Get All program
@admin_router.get("/get_all_program", status_code=status.HTTP_200_OK)
async def get_all_program(db: db_dependency):
    get_all_programs = db.query(model.Program).all()

    return {"programs": get_all_programs}

    
#CRUD Course 
#----------------------------------------------------
@admin_router.post("/create/course", status_code=status.HTTP_201_CREATED)
async def create_course(course: class_course,db: db_dependency):

    # if role != "admin" or role != "teacher":
    #     raise HTTPException(status_code=403, detail="You are not authorized to do this action!")
    course_id = str(uuid.uuid4())   
    course_status = True
    
    db_course = model.Course(
        course_id = course_id,
        course_code = course.course_code,
        course_name = course.course_name,
        program_id = course.program_id,
        units = course.units,
        course_detail = course.course_detail,
        course_status = course_status
    )

    db.add(db_course)
    db.commit()

    return {"message": "Created course successfully"}

@admin_router.get("/course/{course_id}", status_code=status.HTTP_200_OK)
async def fetch_course(course_id: str,role: Annotated[str, Depends(isAuthorized)], db: db_dependency):
    
    if role != "admin": 
        raise HTTPException(status_code=403, detail="You are not authorized to do this action!")

    get_course = db.query(model.Course).filter(model.Course.course_id == course_id).first()
    if get_course == None:
        raise HTTPException(status_code=404, detail="Course not found")

    return {"course": get_course}


# @admin_router.get("/course", status_code=status.HTTP_200_OK)
# async def getall_course(db: db_dependency):
#     getall_results = db.query(model.Course, model.Program).join(model.Program, model.Course.program_id == model.Program.program_id).group_by(model.Course.course_id)

#     new_results = db.execute(getall_results).mappings().all()

#     return {"courses": new_results} 

#Getting All Course
@admin_router.get("/get_all_course", status_code=status.HTTP_200_OK)
async def get_all_course(db: db_dependency):

    get_all_courses = db.query(
        model.Course.course_id,
        model.Course.course_code,
        model.Course.course_name,
        model.Course.units,
        model.Course.program_id,
        model.Course.course_detail
    ).all()

    courses = []
    for course in get_all_courses:
        program = db.query(model.Program.program_name).filter(model.Program.program_id == course.program_id).first()
        
        courses.append({
            "course_id": course.course_id,
            "course_code": course.course_code,
            "course_name": course.course_name,
            "units": course.units,
            "program_name": program.program_name if program else None,
            "program_id": course.program_id,
            "course_detail": course.course_detail
        })

    return {"courses": courses}

@admin_router.put("/course/{course_id}", status_code=status.HTTP_202_ACCEPTED)
async def edit_course(course_id: str, course_edit: EditCourse, db:db_dependency):
    get_course = db.query(model.Course).filter(model.Course.course_id == course_id)
    if get_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no such course!")
    edit = {         
        "course_name": course_edit.course_name,
        "course_code": course_edit.course_code,
        "program_id": course_edit.program_id,
        "units": course_edit.units,
        "course_detail": course_edit.course_detail,
    }   

    get_course.update(edit)
    db.commit()

    return {"message": "Updated course has been updated!"}
    
@admin_router.delete("/course/{course_id}", status_code=status.HTTP_202_ACCEPTED)
async def delete_course(course_id: str, db:db_dependency):
    get_course = db.query(model.Course).filter(model.Course.course_id == course_id) 
    if get_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is no such course!")
    
    get_course.delete()
    db.commit()


#CRUD Section of table Section
#---------------------------------------------------------
@admin_router.post("/section/create", status_code=status.HTTP_201_CREATED)
async def create_section(section: CreateSection, role: Annotated[str, Depends(isAuthorized)] ,db: db_dependency):
    
    if role != "admin":
        raise HTTPException(
            status_code=403,
            detail="You are not authorized to do this action!"
        )

    section_id = str(uuid.uuid4())


    db_new_section = model.Section(
    section_id = section_id,
    section_name = section.section_name, #Default Value
    program_id = section.program_id,
    teacher_id = section.teacher_id,
    current_student = section.current_student
    )

    db.add(db_new_section)
    db.commit()


@admin_router.get("/get_all/stats", status_code=status.HTTP_200_OK)
async def get_all_stats(db: db_dependency):
    total_students = db.query(model.Student).count()
    total_teachers = db.query(model.Teacher).count()
    total_courses = db.query(model.Course).count()

    return {"Total Students": total_students, "Total Teachers": total_teachers, "Total Courses": total_courses}


#CRUD STUDENT TABLE
#Get all Student from Admin Dashboard Student List
@admin_router.get("/get_all_student", status_code=status.HTTP_200_OK)
async def get_all_student(
    db: db_dependency,
    status: str = None,
    program_id: str = None,
    level: int = None
):
    try:
        # Start with base query
        query = (
            db.query(
                model.Student.student_id,
                model.Student.level,
                model.Student.student_status,
                model.User.firstname,
                model.User.lastname,
                model.User.username,
                model.Program.program_name,
                model.Section.section_name
            )
            .join(model.User, model.Student.user_id == model.User.user_id)
            .join(model.Program, model.Student.program_id == model.Program.program_id)
            .join(model.Section, model.Student.section_id == model.Section.section_id)
        )

        # Apply filters if provided
        if status:
            query = query.filter(model.Student.student_status == status)
        if program_id:
            query = query.filter(model.Student.program_id == program_id)
        if level:
            query = query.filter(model.Student.level == level)

        # Execute query
        students_query = query.all()

        students = []
        for student in students_query:
            students.append({
                "student_id": student.student_id,
                "name": f"{student.firstname} {student.lastname}",
                "program": student.program_name,
                "year_level": student.level,
                "section": student.section_name,
                "email": student.username,
                "status": student.student_status
            })

        return {"students": students}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch students: {str(e)}"
        )


#Delete Student From Admin Dashboard Student List
@admin_router.delete("/delete_student/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_student(student_id: str, db: db_dependency):
    # First, check if the student exists
    student = db.query(model.Student).filter(model.Student.student_id == student_id).first()
    
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    
    # Now delete the student record
    db.delete(student)
    db.commit()

    # Return a response (204 No Content signifies successful deletion)
    return {"message": "Student deleted successfully"}

#Update Student From Admin Dashboard Student List
@admin_router.put("/update_student/{student_id}", status_code=status.HTTP_200_OK)
async def update_student(
    student_id: int,
    student_data: UpdateStudent,
    db: db_dependency
):
    try:
        # Query the student by student_id
        student = db.query(model.Student).filter(model.Student.student_id == student_id).first()

        if not student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        # Split name into first and last names
        first_name, last_name = student_data.name.split(' ', 1)

        # Update the student fields
        student.program_id = student_data.program_id
        student.section_id = student_data.section_id
        student.level = student_data.level

        # Update User table with the new name and email
        user = db.query(model.User).filter(model.User.user_id == student.user_id).first()
        if user:
            user.firstname = first_name
            user.lastname = last_name
            user.username = student_data.email
        else:
            raise HTTPException(
                status_code=404,
                detail="User associated with student not found"
            )

        # Commit the changes to the database
        db.commit()

        # Refresh the updated student to reflect the changes in the response
        db.refresh(student)
        db.refresh(user)

        # Return updated student details
        return {
            "student_id": student.student_id,
            "program_id": student.program_id,
            "section_id": student.section_id,
            "level": student.level,
            "name": f"{user.firstname} {user.lastname}",
            "email": user.username
        }

    except Exception as e:
        db.rollback()  # Rollback in case of an error
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update student: {str(e)}"
        )
