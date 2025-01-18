import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

// Add Teacher Form Component
const AddTeacherForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    employeeId: '',
    specialization: '',
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""} max-w-2xl mx-auto`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Teacher</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee ID</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <div className={`border-2 border-dashed rounded-lg p-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Click to upload photo</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white`}
            >
              Add Teacher
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Add Student Form Component
const AddStudentForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    course: '',
    yearLevel: '',
    section: '',
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""} max-w-2xl mx-auto`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Student</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year Level</label>
              <select
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.yearLevel}
                onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                required
              >
                <option value="">Select Year Level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Section</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <div className={`border-2 border-dashed rounded-lg p-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="student-photo-upload"
              />
              <label htmlFor="student-photo-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Click to upload photo</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white`}
            >
              Add Student
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Add Section Form Component
const AddSectionForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    sectionName: '',
    course: '',
    yearLevel: '',
    semester: '',
    maxStudents: '',
    schedule: '',
    room: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""} max-w-2xl mx-auto`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Section</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Section Name</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.sectionName}
              onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year Level</label>
              <select
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.yearLevel}
                onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                required
              >
                <option value="">Select Year Level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <select
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                required
              >
                <option value="">Select Semester</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Students</label>
              <input
                type="number"
                className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Schedule</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white`}
            >
              Add Section
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Add Course Form Component
const AddCourseForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    creditHours: '',
    department: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""} max-w-2xl mx-auto`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Course</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course Code</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.courseCode}
              onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Credit Hours</label>
            <input
              type="number"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.creditHours}
              onChange={(e) => setFormData({ ...formData, creditHours: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className={`w-full p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white`}
            >
              Add Course
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { AddTeacherForm, AddStudentForm, AddSectionForm, AddCourseForm };
