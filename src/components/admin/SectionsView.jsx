import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import DataTable from './DataTable';
import FilterComponent from './FilterComponent';

const SectionsView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const [sections] = useState([
    { id: 1, name: 'Section A', yearLevel: '1st Year', course: 'Computer Science', maxStudents: 40, currentStudents: 35, schedule: 'MWF 9:00-10:30 AM', room: 'Room 301' },
    { id: 2, name: 'Section B', yearLevel: '2nd Year', course: 'Information Technology', maxStudents: 30, currentStudents: 28, schedule: 'TTh 1:00-2:30 PM', room: 'Room 202' },
    // Add more sections here as needed
  ]);

  const filteredSections = sections.filter(section => {
    const matchesSearch = Object.values(section).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !filterYear || section.yearLevel === filterYear;
    return matchesSearch && matchesYear;
  });

  const handleFilterChange = (key, value) => {
    if (key === 'yearLevel') setFilterYear(value);
  };

  return (
    <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <ArrowLeft size={20} />
          </button>
          <CardTitle>Sections List</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <FilterComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              key: 'yearLevel',
              value: filterYear,
              options: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
              placeholder: 'Filter by Year'
            }
          ]}
          onFilterChange={handleFilterChange}
        />

        <DataTable
          columns={[
            { header: 'Section Name', key: 'name' },
            { header: 'Year Level', key: 'yearLevel' },
            { header: 'Course', key: 'course' },
            { header: 'Students', key: 'currentStudents' },
            { header: 'Schedule', key: 'schedule' },
            { header: 'Room', key: 'room' },
          ]}
          data={filteredSections}
          onEdit={(section) => console.log('Edit section:', section)}
          onDelete={(section) => window.confirm(`Are you sure you want to delete ${section.name}?`) && console.log('Delete section:', section)}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default SectionsView;
