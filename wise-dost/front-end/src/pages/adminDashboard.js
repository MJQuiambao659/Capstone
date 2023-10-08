import React, { useState, useEffect } from "react";
import TopBar from "../components/Layout/TopBar";
import SideBar from "../components/Layout/Sidebar";
import Dashboard from "../components/Layout/Dashboard";
import Grades from "../components/Layout/Grades";
import Users from "../components/Layout/Users";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumbs";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [content, setContent] = useState(
    <Dashboard isSidebarOpen={isSidebarOpen} />
  );
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setInitialContent = () => {
    switch (location.pathname) {
      case "/admin":
        setContent(<Dashboard isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/dashboard":
        setContent(<Dashboard isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/grades":
        setContent(<Grades isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/users":
        setContent(<Users isSidebarOpen={isSidebarOpen} />);
        break;
      default:
        setContent(null); // Clear content if no route matches
    }
  };

  useEffect(() => {
    setInitialContent(); // Set initial content based on the current route
  }, [location.pathname]); // Re-run when the route changes

  const onItemClick = (item) => {
    switch (item) {
      case "dashboard":
        setContent(<Dashboard isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/dashboard");
        break;
      case "grades":
        setContent(<Grades isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/grades");
        break;
      case "users":
        setContent(<Users isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/users");
        break;
      default:
        setContent(null); // Clear content if no item matches
    }
  };

  return (
    <>
      <div>
        <TopBar />
        <SideBar
          onItemClick={onItemClick}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* Main content */}
        <div
          style={{
            marginLeft: isSidebarOpen ? "225px" : "75px",
            marginRight: isSidebarOpen ? "55px" : "55px",
            marginTop: 50, // Adjust as needed
          }}
        >
          <Breadcrumb />
        </div>
        <main
          style={{
            marginLeft: isSidebarOpen ? "225px" : "75px",
            marginRight: isSidebarOpen ? "55px" : "55px",
            marginTop: 15, // Adjust as needed
          }}
        >
          {content}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
