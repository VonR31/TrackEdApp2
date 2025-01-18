import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import DataTable from './DataTable';
import FilterComponent from './FilterComponent';

const StudentsView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const [students] = useState([
    { id: 1, name: 'Zoltan Gutierrez', studentId: 'S001', program: 'Computer Science', yearLevel: '3rd Year', section: 'A', email: 'zg.student@example.com' },
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = Object.values(student).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = !filterProgram || student.program === filterProgram;
    const matchesYear = !filterYear || student.yearLevel === filterYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const handleEdit = (student) => console.log('Edit student:', student);
  const handleDelete = (student) => window.confirm(`Are you sure you want to delete ${student.name}?`) && console.log('Delete student:', student);

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
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
            { key: 'program', placeholder: 'All Programs', value: filterProgram, options: [...new Set(students.map(s => s.program))] },
            { key: 'yearLevel', placeholder: 'All Years', value: filterYear, options: ['1st Year', '2nd Year', '3rd Year', '4th Year'] }
          ]}
          onFilterChange={(key, value) => {
            if (key === 'program') setFilterProgram(value);
            if (key === 'yearLevel') setFilterYear(value);
          }}
        />
        <DataTable
          columns={[
            { header: 'Student ID', key: 'studentId' },
            { header: 'Name', key: 'name' },
            { header: 'Program', key: 'program' },
            { header: 'Year Level', key: 'yearLevel' },
            { header: 'Section', key: 'section' },
            { header: 'Email', key: 'email' }
          ]}
          data={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default StudentsView;
