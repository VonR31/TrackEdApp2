import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/auth/LoginForm';  // Adjust path if needed
//import AdminPage from './components/admin/AdminPage';  // You can create this component for admin
import TeacherPage from './components/teacher/TeacherPage';  // Create this page for teachers
import StudentManagement from './components/teacher/StudentManagement';
//import StudentDashboard from './components/student/StudentDashboard';  // Create this page for students

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
        <Route path="/home" element={<TeacherPage />} />
        <Route path="/student-management" element={<StudentManagement />} />
       
      
      </Routes>
    </Router>
  );
}

export default App;