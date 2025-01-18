import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import components
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherPage from './components/teacher/TeacherPage';
import StudentManagement from './components/teacher/StudentManagement';
import StudentDashboard from './components/student/StudentDashboard';
import TeachersView from './components/admin/TeachersView';
import StudentsView from './components/admin/StudentsView';
import SectionsView from './components/admin/SectionsView';
import CoursesView from './components/admin/CoursesView';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginForm />} />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} 
        />
        <Route 
          path="/teachers" 
          element={<ProtectedRoute element={<TeachersView darkMode={false} />} allowedRoles={['admin']} />} 
        />
        <Route 
          path="/students" 
          element={<ProtectedRoute element={<StudentsView darkMode={false} />} allowedRoles={['admin']} />} 
        />
        <Route 
          path="/sections" 
          element={<ProtectedRoute element={<SectionsView darkMode={false} />} allowedRoles={['admin']} />} 
        />
        <Route 
          path="/courses" 
          element={<ProtectedRoute element={<CoursesView darkMode={false} />} allowedRoles={['admin']} />} 
        />

        {/* Teacher Routes */}
        <Route 
          path="/home" 
          element={<ProtectedRoute element={<TeacherPage />} allowedRoles={['teacher']} />} 
        />
        <Route 
          path="/student-management" 
          element={<ProtectedRoute element={<StudentManagement />} allowedRoles={['teacher']} />} 
        />

        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;