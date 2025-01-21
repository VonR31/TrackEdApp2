import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import DataTable from "./DataTable";
import FilterComponent from "./FilterComponent";
import EditModal from "./EditModal";

const baseURL = "http://127.0.0.1:8000";

const StudentsView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]); // Store programs data

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/get_all_student`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Fetch programs data
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/get_all_program`);
        if (!response.ok) throw new Error("Failed to fetch programs");
        const data = await response.json();
        setPrograms(data.programs || []);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  //Yearlevel
  const levels = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
  ];

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedStudent) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/update_student/${updatedStudent.student_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );
      if (!response.ok) throw new Error("Failed to update student");
      const result = await response.json();

      setStudents((prev) =>
        prev.map((student) =>
          student.student_id === updatedStudent.student_id ? result : student
        )
      );

      setIsEditModalOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
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
              options: [...new Set(students.map((s) => s.program))].filter(
                Boolean
              ),
            },
            {
              key: "year_level",
              placeholder: "All Years",
              value: filterYear,
              options: [...new Set(students.map((s) => s.year_level))].filter(
                Boolean
              ),
            },
          ]}
          onFilterChange={(key, value) => {
            if (key === "program") setFilterProgram(value);
            if (key === "year_level") setFilterYear(value);
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
          ]}
          data={filteredStudents}
          onEdit={handleEdit}
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
            fields={[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email" },
              {
                key: "level",
                label: "Year Level",
                type: "dropdown", // Specify dropdown type
                options: levels, // Use the levels array for dropdown options
              },
              {
                key: "program",
                label: "Program",
                type: "dropdown",
                options: programs.map((program) => ({
                  value: program.id,
                  label: program.name,
                })),
              },
              { key: "section", label: "Section" },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StudentsView;
