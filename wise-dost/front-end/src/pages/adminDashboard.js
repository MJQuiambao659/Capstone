import React, { useState, useEffect } from "react";
import TopBar from "../components/Layout/TopBar";
import SideBar from "../components/Layout/Sidebar";
import Dashboard from "../components/Layout/SidebarContent/Dashboard";
import Grades from "../components/Layout/SidebarContent/Grades";
import Users from "../components/Layout/SidebarContent/Users";
import Announcements from "../components/Layout/SidebarContent/Announcements";
import Analytics from "../components/Layout/SidebarContent/Analytics";
import Scholarships from "../components/Layout/SidebarContent/Scholarships";
import Programs from "../components/Layout/SidebarContent/Programs";
import Schools from "../components/Layout/SidebarContent/Schools";
import Courses from "../components/Layout/SidebarContent/Courses";
import Subjects from "../components/Layout/SidebarContent/Subjects";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumbs";
import Loading from "../utils/loading";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [content, setContent] = useState(
    <Dashboard isSidebarOpen={isSidebarOpen} />
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
      case "/admin/analytics":
        setContent(<Analytics isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/announcements":
        setContent(<Announcements isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/scholars/grades":
        setContent(<Grades isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/scholars/users":
        setContent(<Users isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/education/scholarships":
        setContent(<Scholarships isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/education/programs":
        setContent(<Programs isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/education/schools":
        setContent(<Schools isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/education/courses":
        setContent(<Courses isSidebarOpen={isSidebarOpen} />);
        break;
      case "/admin/education/subjects":
        setContent(<Subjects isSidebarOpen={isSidebarOpen} />);
        break;
      default:
        setContent(null); // Clear content if no route matches
    }
  };

  useEffect(() => {
    setInitialContent(); // Set initial content based on the current route
  }, [location.pathname]); // Re-run when the route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Admin") {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, [navigate, location]);

  if (loading) {
    return <Loading />;
  }

  const onItemClick = (item) => {
    switch (item) {
      case "dashboard":
        setContent(<Dashboard isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/dashboard");
        break;
      case "analytics":
        setContent(<Analytics isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/analytics");
        break;
      case "announcements":
        setContent(<Announcements isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/announcements");
        break;
      case "grades":
        setContent(<Grades isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/scholars/grades");
        break;
      case "users":
        setContent(<Users isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/scholars/users");
        break;
      case "scholarships":
        setContent(<Scholarships isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/education/scholarships");
        break;
      case "programs":
        setContent(<Programs isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/education/programs");
        break;
      case "schools":
        setContent(<Schools isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/education/schools");
        break;
      case "courses":
        setContent(<Courses isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/education/courses");
        break;
      case "subjects":
        setContent(<Subjects isSidebarOpen={isSidebarOpen} />);
        navigate("/admin/education/subjects");
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
            marginRight: isSidebarOpen ? "40px" : "40px",
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
