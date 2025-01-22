import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import DataTable from "./DataTable";
import FilterComponent from "./FilterComponent";
import EditModal from "./EditModal";

const baseURL = "http://127.0.0.1:8000";

const StudentsView = ({ darkMode, onBack }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/get_all_student`);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        console.log(data); // Log the response to check the structure
        setStudents(data.students || []); // Ensure we set an empty array if `students` is undefined
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const editFields = [
    { key: "name", label: "Name", type: "text" },
    {
      key: "program",
      label: "Program",
      type: "select",
      options: [
        { value: "1", label: "Information Technology" },
        { value: "2", label: "Information Systems" },
      ],
    },
    {
      key: "yearLevel",
      label: "Year Level",
      type: "select",
      options: [
        { value: "1", label: "1st Year" },
        { value: "2", label: "2nd Year" },
        { value: "3", label: "3rd Year" },
        { value: "4", label: "4th Year" },
      ],
    },
    {
      key: "section",
      label: "Section",
      type: "select",
      options: [
        { value: "1", label: "A" },
        { value: "2", label: "B" },
        { value: "3", label: "C" },
        { value: "4", label: "D" },
      ],
    },
    { key: "email", label: "Email", type: "text" },
  ];

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.student_id === updatedStudent.student_id
          ? updatedStudent
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = Object.values(student)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram = !filterProgram || student.program === filterProgram;
    const matchesYear = !filterYear || student.year_level === filterYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const handleDelete = (student) =>
    window.confirm(`Are you sure you want to delete ${student.name}?`) &&
    setStudents((prev) =>
      prev.filter((s) => s.student_id !== student.student_id)
    );

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
          <CardTitle>Students List</CardTitle>
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
              options: [...new Set(students.map((s) => s.program))],
            },
            {
              key: "yearLevel",
              placeholder: "All Years",
              value: filterYear,
              options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
            },
          ]}
          onFilterChange={(key, value) => {
            if (key === "program") setFilterProgram(value);
            if (key === "yearLevel") setFilterYear(value);
          }}
        />
        <DataTable
          columns={[
            { header: "Student ID", key: "student_id" },
            { header: "Name", key: "name" },
            { header: "Program", key: "program" },
            { header: "Year Level", key: "year_level" },
            { header: "Section", key: "section" },
            { header: "Email", key: "email" },
            { header: "Current Grade", key: "current_grade" },
          ]}
          data={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
        {selectedStudent && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedStudent(null);
            }}
            onSave={handleSave}
            data={selectedStudent}
            fields={editFields}
            title="Student"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StudentsView;
