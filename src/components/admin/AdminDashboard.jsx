import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, LogOut, Menu as MenuIcon, Sun, Moon, Users, BookOpen, Layout, PieChart,
  PlusCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AddTeacherForm, AddStudentForm, AddSectionForm, AddCourseForm } from './Forms';
import UserAnalytics from './UserAnalytics';
import TeachersView from './TeachersView';
import StudentsView from './StudentsView';
import SectionsView from './SectionsView';
import CoursesView from './CoursesView';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard', 'list', 'form'

  const stats = {
    teachers: { total: 50, label: "Teachers" },
    students: { total: 500, label: "Students" },
    sections: { total: 20, label: "Sections" },
    courses: { total: 30, label: "Courses" }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/");
    }
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted:", data);
    setViewMode('dashboard');
    setActiveTab('dashboard');
  };

  const handleSeeAll = (section) => {
    setActiveTab(section);
    setViewMode('list');
  };

  const handleAddNew = (section) => {
    setActiveTab(section);
    setViewMode('form');
  };

  const renderContent = () => {
    if (viewMode === 'list') {
      switch (activeTab) {
        case 'teachers':
          return <TeachersView darkMode={darkMode} onBack={() => setViewMode('dashboard')} />;
        case 'students':
          return <StudentsView darkMode={darkMode} onBack={() => setViewMode('dashboard')} />;
        case 'sections':
          return <SectionsView darkMode={darkMode} onBack={() => setViewMode('dashboard')} />;
        case 'courses':
          return <CoursesView darkMode={darkMode} onBack={() => setViewMode('dashboard')} />;
        default:
          return null;
      }
    }

    if (viewMode === 'form') {
      switch (activeTab) {
        case 'teachers':
          return <AddTeacherForm darkMode={darkMode} onClose={() => setViewMode('dashboard')} onSubmit={handleFormSubmit} />;
        case 'students':
          return <AddStudentForm darkMode={darkMode} onClose={() => setViewMode('dashboard')} onSubmit={handleFormSubmit} />;
        case 'sections':
          return <AddSectionForm darkMode={darkMode} onClose={() => setViewMode('dashboard')} onSubmit={handleFormSubmit} />;
        case 'courses':
          return <AddCourseForm darkMode={darkMode} onClose={() => setViewMode('dashboard')} onSubmit={handleFormSubmit} />;
        default:
          return null;
      }
    }

    // Dashboard view
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, data]) => (
            <Card key={key} className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
              <CardHeader className="pb-2 flex justify-between items-center">
                <button
                  className={`text-sm font-medium px-4 py-1 rounded-full 
                    ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} 
                    text-white transition-colors`}
                  onClick={() => handleSeeAll(key)}
                >
                  See {data.label}
                </button>
                <button
                  onClick={() => handleAddNew(key)}
                  className={`p-2 rounded-full 
                    ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                >
                  <PlusCircle size={20} />
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{data.total}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={`${darkMode ? "bg-gray-800 text-white" : ""}`}>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
          <UserAnalytics darkMode={darkMode} />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className={`fixed top-0 left-0 h-full ${collapsed ? "w-16" : "w-64"} 
        ${darkMode ? "bg-gray-800" : "bg-white"} 
        transition-all duration-300 shadow-lg z-50`}>
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"}`}>
              Admin Portal
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <MenuIcon size={20} />
          </button>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setViewMode('dashboard');
            }}
            className={`w-full p-4 flex items-center 
              ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}
              ${activeTab === 'dashboard' ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
          >
            <Layout size={20} className="mr-3" />
            {!collapsed && <span>Dashboard</span>}
          </button>
          {Object.entries(stats).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleSeeAll(key)}
              className={`w-full p-4 flex items-center 
                ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}
                ${activeTab === key ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
            >
              {key === 'courses' ? <BookOpen size={20} className="mr-3" /> : <Users size={20} className="mr-3" />}
              {!collapsed && <span>{data.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className={`${collapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
        <div className={`h-16 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm flex items-center justify-end px-6`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <User size={20} />
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                  ${darkMode ? "bg-gray-800" : "bg-white"} ring-1 ring-black ring-opacity-5`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 flex items-center space-x-2 
                      ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;