import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const baseURL = "http://127.0.0.1:8000";

// Add Teacher Form Component
const AddTeacherForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    photo: null,
    program: " ",
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
    <Card
      className={`${
        darkMode ? "bg-gray-800 text-white" : ""
      } max-w-2xl mx-auto`}
    >
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
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              required
            >
              <option value="">Select Course</option>
              <option value="1"> </option> //value from the courses table
              <option value="2"> </option> //value from the courses table
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Program</label>
              <select
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.program}
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
                required
              >
                <option value="">Select Program</option>
                <option value="1"></option>
                <option value="2"></option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg custom-maroon-button`}
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
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    yearLevel: "",
    section: "",
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
    <Card
      className={`${
        darkMode ? "bg-gray-800 text-white" : ""
      } max-w-2xl mx-auto`}
    >
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
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Program</label>
              <select
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.program}
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
                required
              >
                <option value="">Select Program</option>
                <option value="1"></option>
                <option value="2"></option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Level
              </label>
              <select
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.yearLevel}
                onChange={(e) =>
                  setFormData({ ...formData, yearLevel: e.target.value })
                }
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
            <select
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
              required
            >
              <option value="">Select Section</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
              <option value="4">D</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg custom-maroon-button`}
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
    sectionName: "",
    course: "",
    yearLevel: "",
    schedule: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card
      className={`${
        darkMode ? "bg-gray-800 text-white" : ""
      } max-w-2xl mx-auto`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Section</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Section Name
            </label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.sectionName}
              onChange={(e) =>
                setFormData({ ...formData, sectionName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Program</label>
              <select
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.yearLevel}
                onChange={(e) =>
                  setFormData({ ...formData, yearLevel: e.target.value })
                }
                required
              >
                <option value="">Select Program</option>
                <option value="1"></option>
                <option value="2"></option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Level
              </label>
              <select
                className={`w-full p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={formData.yearLevel}
                onChange={(e) =>
                  setFormData({ ...formData, yearLevel: e.target.value })
                }
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
            <label className="block text-sm font-medium mb-1">Schedule</label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg custom-maroon-button`}
            >
              Add Section
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

//Add Course Form
const AddCourseForm = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "",
    program_id: "",
    units: "",
    course_detail: "",
    class_status: true, // Added this field with default value true
  });
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/get_all_program`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch programs.");
        }

        setPrograms(data.programs);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to load programs");
      }
    };

    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate units is a valid number (now expect integer)
    const unitsNum = parseInt(formData.units, 10); // Parse as an integer

    // Check if units is a valid integer
    if (isNaN(unitsNum) || unitsNum <= 0) {
      setError("Units must be a valid integer greater than 0");
      return;
    }

    // Prepare the data to send
    const courseData = {
      ...formData,
      units: unitsNum, // Ensure it's an integer before sending
      class_status: true, // Ensure this is included
    };

    try {
      const response = await fetch(`${baseURL}/admin/create/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.detail) {
          if (Array.isArray(data.detail)) {
            const errorMessage = data.detail
              .map((err) => `${err.loc.join(".")} - ${err.msg}`)
              .join("\n");
            throw new Error(errorMessage);
          } else {
            throw new Error(JSON.stringify(data.detail, null, 2));
          }
        }
        throw new Error(data.detail || "Failed to add course");
      }

      console.log("Course added successfully:", data);
      onClose();
    } catch (err) {
      console.error("Full error:", err);
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <Card
      className={`${
        darkMode ? "bg-gray-800 text-white" : ""
      } max-w-2xl mx-auto`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Course</CardTitle>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700">
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Code
            </label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.course_code}
              onChange={(e) =>
                setFormData({ ...formData, course_code: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Course Name
            </label>
            <input
              type="text"
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.course_name}
              onChange={(e) =>
                setFormData({ ...formData, course_name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Units</label>
            <input
              type="number"
              min="1" // Minimum value of 1
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.units}
              onChange={(e) =>
                setFormData({ ...formData, units: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Program</label>
            <select
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.program_id}
              onChange={(e) =>
                setFormData({ ...formData, program_id: e.target.value })
              }
              required
            >
              <option value="">Select Program</option>
              {programs.map((program) => (
                <option key={program.program_id} value={program.program_id}>
                  {program.program_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Course Details
            </label>
            <textarea
              className={`w-full p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
              value={formData.course_detail}
              onChange={(e) =>
                setFormData({ ...formData, course_detail: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg custom-maroon-button"
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
