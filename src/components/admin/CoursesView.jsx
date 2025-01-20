import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import DataTable from "./DataTable";
import FilterComponent from "./FilterComponent";
import EditModal from "./EditModal";

const CoursesView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      program: "Computer Science",
      units: 3,
      description: "Basic programming concepts and problem-solving",
      prerequisite: "None",
    },
    {
      id: 2,
      code: "IT102",
      name: "Data Structures",
      program: "Information Technology",
      units: 3,
      description: "Introduction to data structures",
      prerequisite: "CS101",
    },
  ]);

  const editFields = [
    { key: "code", label: "Course Code" },
    { key: "name", label: "Course Name" },
    { key: "program", label: "Program" },
    { key: "units", label: "Units" },
    { key: "description", label: "Description" },
    { key: "prerequisite", label: "Prerequisite" },
  ];

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = Object.values(course)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram = !filterProgram || course.program === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const handleDelete = (course) =>
    window.confirm(`Are you sure you want to delete ${course.name}?`) &&
    setCourses((prev) => prev.filter((c) => c.id !== course.id));

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
              options: [...new Set(courses.map((c) => c.program))],
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
            { header: "Course Code", key: "code" },
            { header: "Course Name", key: "name" },
            { header: "Program", key: "program" },
            { header: "Units", key: "units" },
            { header: "Prerequisite", key: "prerequisite" },
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
