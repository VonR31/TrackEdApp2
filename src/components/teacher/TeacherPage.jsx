import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Menu as MenuIcon, X, Home, Calendar, Book, Bell, Sun, Moon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const TeacherPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Sample teacher's subjects and schedules
  const teacherSubjects = [
    { 
      name: "Technopreneurship", 
      code: "TechnoPre", 
      schedule: "MWF 9:00-10:30 AM",
      sections: ["Section A", "Section B", "Section C"],
      room: "Room 301"
    },
    { 
      name: "Ethics", 
      code: "GE108", 
      schedule: "TTH 1:00-2:30 PM",
      sections: ["Section D", "Section E"],
      room: "Room 205"
    },
    { 
      name: "Project Management", 
      code: "ITElectv3", 
      schedule: "MWF 2:00-3:30 PM",
      sections: ["Section F", "Section G"],
      room: "Room 405"
    }
  ];

  // Weekly schedule organized by day
  const weeklySchedule = {
    Monday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ],
    Tuesday: [
      { subject: "Ethics", time: "1:00-2:30 PM", room: "Room 205" }
    ],
    Wednesday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ],
    Thursday: [
      { subject: "Ethics", time: "1:00-2:30 PM", room: "Room 205" }
    ],
    Friday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ]
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
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

  const renderContent = () => {
    if (selectedSubject) {
      return (
        <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedSubject.name}</span>
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Back to Dashboard
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm opacity-75">Schedule: {selectedSubject.schedule}</p>
              <p className="text-sm opacity-75">Room: {selectedSubject.room}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSubject.sections.map((section) => (
                <button
                  key={section}
                  onClick={() => navigate("/student-management")}
                  className={`p-4 rounded-lg ${
                    darkMode 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'calendar') {
      return (
        <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(weeklySchedule).map(([day, schedules]) => (
                <div key={day} className="space-y-2">
                  <h3 className="font-semibold text-lg">{day}</h3>
                  <div className="space-y-2">
                    {schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <div className="font-medium">{schedule.subject}</div>
                        <div className="text-sm opacity-75">
                          {schedule.time} | {schedule.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell size={20} />
              <span>Recent Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No new announcements</p>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book size={20} />
              <span>Subjects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherSubjects.map((subject) => (
                <button
                  key={subject.code}
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full p-4 rounded-lg text-left ${
                    darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="font-medium">{subject.name}</div>
                  <div className="text-sm opacity-75">
                    {subject.schedule} | {subject.room}
                  </div>
                  <div className="text-sm opacity-75">
                    {subject.sections.length} sections
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} 
        ${darkMode ? "bg-gray-800" : "bg-white"} 
        transition-all duration-300 shadow-lg z-50`}>
        
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"}`}>
              Teacher Portal
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            {collapsed ? <MenuIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <button
            onClick={() => {
              setActiveTab('home');
              setSelectedSubject(null);
            }}
            className={`w-full p-4 flex items-center 
              ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}
              ${activeTab === 'home' ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
          >
            <Home size={20} className="mr-3" />
            {!collapsed && <span>Home</span>}
          </button>
          
          <button
            onClick={() => {
              setActiveTab('calendar');
              setSelectedSubject(null);
            }}
            className={`w-full p-4 flex items-center 
              ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}
              ${activeTab === 'calendar' ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
          >
            <Calendar size={20} className="mr-3" />
            {!collapsed && <span>Schedule</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
        {/* Top Navigation */}
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

        {/* Dashboard Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;