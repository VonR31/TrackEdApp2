import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import DataTable from "./DataTable";
import FilterComponent from "./FilterComponent";
import EditModal from "./EditModal";

const TeachersView = ({ darkMode, onBack }) => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Fetch teachers data from the backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/admin/get_all_teacher"
        );
        const data = await response.json();
        if (data.status === "success") {
          setTeachers(data.teachers);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTeacher) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.teacher_id === updatedTeacher.teacher_id
          ? updatedTeacher
          : teacher
      )
    );
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (teacher) =>
    window.confirm(`Are you sure you want to delete ${teacher.name}?`) &&
    setTeachers((prev) =>
      prev.filter((t) => t.teacher_id !== teacher.teacher_id)
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
          <CardTitle>Teachers List</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <FilterComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <DataTable
          columns={[
            { header: "Teacher ID", key: "teacher_id" },
            { header: "Name", key: "name" },
            { header: "Program", key: "program" },
            { header: "Email", key: "email" },
          ]}
          data={filteredTeachers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />

        {selectedTeacher && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedTeacher(null);
            }}
            onSave={handleSave}
            data={selectedTeacher}
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "email", label: "Email", type: "text" },
            ]}
            title="Teacher"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeachersView;
