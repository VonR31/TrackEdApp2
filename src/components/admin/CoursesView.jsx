import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import DataTable from "./DataTable";
import FilterComponent from "./FilterComponent";
import EditModal from "./EditModal";

const baseURL = "http://127.0.0.1:8000"; // Define base URL

const CoursesView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/get_all_course`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const editFields = [
    { key: "course_code", label: "Course Code" },
    { key: "course_name", label: "Course Name" },
    { key: "program_id", label: "Program" },
    { key: "units", label: "Units" },
    { key: "course_detail", label: "Course Detail" },
  ];

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedCourse) => {
    try {
      // Send PUT request to update the course
      const response = await fetch(
        `${baseURL}/admin/course/${updatedCourse.course_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      // Update the course list in the UI
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.course_id === updatedCourse.course_id ? updatedCourse : course
        )
      );

      setIsEditModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = Object.values(course)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram =
      !filterProgram || course.program_name === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const handleDelete = async (course) => {
    if (
      window.confirm(`Are you sure you want to delete ${course.course_name}?`)
    ) {
      try {
        const response = await fetch(
          `${baseURL}/admin/course/${course.course_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete course");
        }

        // Update the course list after deletion
        setCourses((prev) =>
          prev.filter((c) => c.course_id !== course.course_id)
        );
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <CardTitle>Courses List</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <FilterComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              key: "program",
              placeholder: "All Programs",
              value: filterProgram,
              options: [...new Set(courses.map((c) => c.program_name))],
            },
          ]}
          onFilterChange={(key, value) => {
            if (key === "program") {
              setFilterProgram(value);
            }
          }}
        />

        <DataTable
          columns={[
            { header: "Course Code", key: "course_code" },
            { header: "Course Name", key: "course_name" },
            { header: "Program", key: "program_name" },
            { header: "Units", key: "units" },
            { header: "Course Detail", key: "course_detail" },
          ]}
          data={filteredCourses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />

        {selectedCourse && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedCourse(null);
            }}
            onSave={handleSave}
            data={selectedCourse}
            fields={editFields}
            title="Course"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CoursesView;
