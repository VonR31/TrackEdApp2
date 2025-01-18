import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Search, ArrowLeft } from 'lucide-react';
import  DataTable  from './DataTable';  // Assuming DataTable is a reusable component
import FilterComponent from './FilterComponent';  // Import the FilterComponent

const CoursesView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const [courses] = useState([
    { id: 1, code: 'CS101', name: 'Introduction to Programming', department: 'Computer Science', units: 3, description: 'Basic programming concepts and problem-solving', prerequisite: 'None' },
    { id: 2, code: 'IT102', name: 'Data Structures', department: 'Information Technology', units: 3, description: 'Introduction to data structures', prerequisite: 'CS101' },
    // Add more courses here as needed
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = Object.values(course).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
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
        <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <FilterComponent
            filterOptions={['Computer Science', 'Information Technology']}
            selectedValue={filterDepartment}
            onChange={setFilterDepartment}
            placeholder="Filter by Department"
          />
        </div>

        <DataTable
          columns={[
            { header: 'Course Code', key: 'code' },
            { header: 'Course Name', key: 'name' },
            { header: 'Department', key: 'department' },
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
