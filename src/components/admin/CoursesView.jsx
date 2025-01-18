import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Search, ArrowLeft } from 'lucide-react';
import  DataTable  from './DataTable';  // Assuming DataTable is a reusable component
import FilterComponent from './FilterComponent';  // Import the FilterComponent

const CoursesView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');

  const [courses] = useState([
    { id: 1, code: 'CS101', name: 'Introduction to Programming', program: 'Computer Science', units: 3, description: 'Basic programming concepts and problem-solving', prerequisite: 'None' },
    { id: 2, code: 'IT102', name: 'Data Structures', program: 'Information Technology', units: 3, description: 'Introduction to data structures', prerequisite: 'CS101' },
    // Add more courses here as needed
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = Object.values(course).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = !filterProgram || course.program === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const handleEdit = (course) => console.log('Edit course:', course);
  const handleDelete = (course) => window.confirm(`Are you sure you want to delete ${course.name}?`) && console.log('Delete course:', course);

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
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
            { key: 'program', 
              placeholder: 'All Programs', 
              value: filterProgram, 
              options: [...new Set(courses.map(c => c.program))] }
          ]}
          onFilterChange={(key, value) => {
            if (key === 'program') {
              setFilterProgram(value);
            }
          }}
        />


        <DataTable
          columns={[
            { header: 'Course Code', key: 'code' },
            { header: 'Course Name', key: 'name' },
            { header: 'Program', key: 'program' },
            { header: 'Units', key: 'units' },
            { header: 'Prerequisite', key: 'prerequisite' },
          ]}
          data={filteredCourses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default CoursesView;
