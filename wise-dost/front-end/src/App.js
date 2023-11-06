import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import AdminDashboard from "./pages/adminDashboard";
import UserDashboard from "./pages/userDashboard";
import Dashboard from "./components/Layout/SidebarContent/Dashboard";
import Grades from "./components/Layout/SidebarContent/Grades";
import Users from "./components/Layout/SidebarContent/Users";
import Announcements from "./components/Layout/SidebarContent/Announcements";
import Scholarships from "./components/Layout/SidebarContent/Scholarships";
import Schools from "./components/Layout/SidebarContent/Schools";
import Courses from "./components/Layout/SidebarContent/Courses";
import Subjects from "./components/Layout/SidebarContent/Subjects";
import Analytics from "./components/Layout/SidebarContent/Analytics";
import Programs from "./components/Layout/SidebarContent/Programs"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          {/* Define nested routes starting from /admin */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="scholars/grades" element={<Grades />} />
          <Route path="scholars/users" element={<Users />} />
          <Route path="education/scholarships" element={<Scholarships />} />
          <Route path="education/programs" element={<Programs />} />
          <Route path="education/schools" element={<Schools />} />
          <Route path="education/courses" element={<Courses />} />
          <Route path="education/subjects" element={<Subjects />} />
        </Route>
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
