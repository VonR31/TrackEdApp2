from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, Float, Enum, TEXT
from database import Base

# Table student
class Student(Base):
    __tablename__ = 'student'
    student_id = Column(String(255), primary_key=True, nullable=False)
    user_id = Column(String(255), ForeignKey('user.user_id'), nullable=False)  
    program_id = Column(String(255), ForeignKey('program.program_id'), nullable=False)
    section_id = Column(String(255), ForeignKey('section.section_id'), nullable=False)
    current_gpa = Column(Float, nullable=False)
    gpax = Column(Float, nullable=False)
    credits = Column(Float, nullable=False)
    level = Column(Integer, nullable=False)
    number_course = Column(Integer, nullable=False)
    student_status = Column(Enum("Active","Inactive","Graduated","Suspended","Expelled", name="student_status_enum"), nullable=False) 

# Table course_attend
class CourseAttend(Base):
    __tablename__ = "course_attend"
    course_id = Column(String(255), ForeignKey("course.course_id"), primary_key=True, nullable=False)
    section_id = Column(String(255), ForeignKey("section.section_id"), primary_key=True, nullable=False)
    student_id = Column(String(255), ForeignKey("student.student_id"), nullable=False)
    midterm_grade = Column(Integer, nullable=False)
    final_grade = Column(Integer, nullable=False)
    total_grade = Column(Integer, nullable=False)
    gpa = Column(Float, nullable=False)


# Table attendance
class Attendance(Base):
    __tablename__ = 'attendance'
    attendance_id = Column(String(255), primary_key=True, nullable=False)
    qr_name = Column(String(255), nullable=False)
    qr_png = Column(TEXT, nullable=False)  
    course_id = Column(String(255), ForeignKey('course.course_id'), nullable=False)
    time_start = Column(DateTime, nullable=False)
    time_end = Column(DateTime, nullable=False)
    attendance_status = Column(Boolean, nullable=False)

# Table user
class User(Base):
    __tablename__ = 'user'
    user_id = Column(String(255), primary_key=True, nullable=False)
    firstname = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    role = Column(Enum("student", "teacher", "admin", name="role_enum"), nullable=False)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

# Table admin
class Admin(Base):
    __tablename__ = 'admin'
    admin_id = Column(String(255), primary_key=True, nullable=False)
    user_id = Column(String(255), ForeignKey('user.user_id'), nullable=False)

# Table teacher
class Teacher(Base):
    __tablename__ = 'teacher'
    teacher_id = Column(String(255), primary_key=True, nullable=False)
    user_id = Column(String(255), ForeignKey('user.user_id'), nullable=False)
    num_course_owned = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)

# Table program
class Program(Base):
    __tablename__ = 'program'
    program_id = Column(String(255), primary_key=True, nullable=False)
    program_name = Column(String(255), nullable=False)
    program_details = Column(String(255), nullable=False)
    req_credits = Column(Integer, nullable=False)

#Table Section
class Section(Base):
    __tablename__ = 'section'
    section_id = Column(String(255), primary_key=True, nullable=False)
    section_name = Column(String(255), nullable=False)   
    program_id = Column(String(255), ForeignKey('program.program_id'), nullable=False)
    teacher_id = Column(String(255), ForeignKey('teacher.teacher_id'), nullable=False)
    current_student = Column(Integer) 

# Table course
class Course(Base):
    __tablename__ = 'course'
    course_id = Column(String(255), primary_key=True, nullable=False)
    pre_requisite = Column(String(255))
    course_name = Column(String(255), nullable=False)
    units = Column(Float, nullable=False)
    course_detail = Column(String(255), nullable=False)
    course_status = Column(Boolean,nullable=False)

# Table student_attendance
class StudentAttendance(Base):
    __tablename__ = 'student_attendance'
    attendance_id = Column(String(255), ForeignKey('attendance.attendance_id'), primary_key=True, nullable=False)
    student_id = Column(String(255), ForeignKey('student.student_id'), nullable=False)
    status = Column(Enum('Present','Late','Absent', name='student_attendance_status'), nullable=False)
    time_scanned = Column(DateTime)
 