import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import components for routing
import LoginForm from './components/auth/LoginForm';  // Login form for user authentication
import AdminDashboard from './components/admin/AdminDashboard';  // Admin dashboard view
import TeacherPage from './components/teacher/TeacherPage';  // Teacher's home page
import StudentManagement from './components/teacher/StudentManagement';  // Page for teacher to manage students
import StudentDashboard from './components/student/StudentDashboard';  // Student dashboard page

// Import additional pages for respective routes
import TeachersView from './components/admin/TeachersView';
import StudentsView from './components/admin/StudentsView';
import SectionsView from './components/admin/SectionsView';
import CoursesView from './components/admin/CoursesView';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginForm />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teachers" element={<TeachersView darkMode={false} />} />
        <Route path="/students" element={<StudentsView darkMode={false} />} />
        <Route path="/sections" element={<SectionsView darkMode={false} />} />
        <Route path="/courses" element={<CoursesView darkMode={false} />} />

        {/* Teacher Routes */}
        <Route path="/home" element={<TeacherPage />} />
        <Route path="/student-management" element={<StudentManagement />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
