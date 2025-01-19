import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import DataTable from './DataTable';
import FilterComponent from './FilterComponent';
import EditModal from './EditModal';

const SectionsView = ({ darkMode, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const [sections, setSections] = useState([
    { id: 1, name: 'Section A', yearLevel: '1st Year', course: 'Computer Science', maxStudents: 40, currentStudents: 35, schedule: 'MWF 9:00-10:30 AM', room: 'Room 301' },
    { id: 2, name: 'Section B', yearLevel: '2nd Year', course: 'Information Technology', maxStudents: 30, currentStudents: 28, schedule: 'TTh 1:00-2:30 PM', room: 'Room 202' },
  ]);

  const editFields = [
    { key: 'name', label: 'Section Name' },
    { key: 'yearLevel', label: 'Year Level' },
    { key: 'course', label: 'Course' },
    { key: 'maxStudents', label: 'Maximum Students' },
    { key: 'currentStudents', label: 'Current Students' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'room', label: 'Room' },
  ];

  const handleEdit = (section) => {
    setSelectedSection(section);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedSection) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const filteredSections = sections.filter(section => {
    const matchesSearch = Object.values(section).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !filterYear || section.yearLevel === filterYear;
    return matchesSearch && matchesYear;
  });

  const handleDelete = (section) => 
    window.confirm(`Are you sure you want to delete ${section.name}?`) && 
    setSections(prev => prev.filter(s => s.id !== section.id));

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
              placeholder: 'All Years'
            }
          ]}
          onFilterChange={(key, value) => {
            if (key === 'yearLevel') {
              setFilterYear(value);
            }
          }}
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
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />

        {selectedSection && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSection(null);
            }}
            onSave={handleSave}
            data={selectedSection}
            fields={editFields}
            title="Section"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SectionsView;