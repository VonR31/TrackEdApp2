import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import DataTable from './DataTable';
import FilterComponent from './FilterComponent';

const TeachersView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const [teachers] = useState([
    { id: 1, name: 'Joann Lopez', employeeId: 'T001', department: 'Technopreneurship', email: 'joann.lopez@example.com', phone: '123-456-7890', specialization: 'Software Development' },
  ]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = Object.values(teacher).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || teacher.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEdit = (teacher) => console.log('Edit teacher:', teacher);
  const handleDelete = (teacher) => window.confirm(`Are you sure you want to delete ${teacher.name}?`) && console.log('Delete teacher:', teacher);

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
          filters={[{ key: 'department', placeholder: 'All Departments', value: filterDepartment, options: [...new Set(teachers.map(t => t.department))] }]}
          onFilterChange={(key, value) => key === 'department' ? setFilterDepartment(value) : null}
        />
        <DataTable
          columns={[
            { header: 'Employee ID', key: 'employeeId' },
            { header: 'Name', key: 'name' },
            { header: 'Department', key: 'department' },
            { header: 'Email', key: 'email' },
            { header: 'Specialization', key: 'specialization' }
          ]}
          data={filteredTeachers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default TeachersView;
