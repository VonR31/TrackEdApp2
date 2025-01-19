import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import DataTable from './DataTable';
import FilterComponent from './FilterComponent';
import EditModal from './EditModal';

const TeachersView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Joann Lopez', employeeId: 'T001', course: 'Technopreneurship', email: 'joann.lopez@example.com', specialization: 'Software Development' },
  ]);

  const editFields = [
    { key: 'name', label: 'Name' },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'course', label: 'Course' },
    { key: 'email', label: 'Email' },
    { key: 'specialization', label: 'Specialization' },
  ];

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTeacher) => {
    setTeachers(prevTeachers =>
      prevTeachers.map(teacher =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = Object.values(teacher).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || teacher.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleDelete = (teacher) => 
    window.confirm(`Are you sure you want to delete ${teacher.name}?`) && 
    setTeachers(prev => prev.filter(t => t.id !== teacher.id));

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <ArrowLeft size={20} />
          </button>
          <CardTitle>Teachers List</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <FilterComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[{ key: 'course', placeholder: 'All Courses', value: filterDepartment, options: [...new Set(teachers.map(t => t.course))] }]}
          onFilterChange={(key, value) => key === 'course' ? setFilterDepartment(value) : null}
        />
        <DataTable
          columns={[
            { header: 'Employee ID', key: 'employeeId' },
            { header: 'Name', key: 'name' },
            { header: 'Course', key: 'course' },
            { header: 'Email', key: 'email' },
            { header: 'Specialization', key: 'specialization' }
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
            fields={editFields}
            title="Teacher"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeachersView;