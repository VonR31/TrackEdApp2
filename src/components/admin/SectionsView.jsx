import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Search, ArrowLeft } from 'lucide-react';
import  DataTable  from './DataTable';  // Assuming DataTable is a reusable component
import FilterComponent from './FilterComponent';  // Import the FilterComponent

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

  const handleEdit = (section) => console.log('Edit section:', section);
  const handleDelete = (section) => window.confirm(`Are you sure you want to delete ${section.name}?`) && console.log('Delete section:', section);

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
            filterOptions={['1st Year', '2nd Year', '3rd Year', '4th Year']}
            selectedValue={filterYear}
            onChange={setFilterYear}
            placeholder="Filter by Year"
          />
        </div>

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
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default SectionsView;
