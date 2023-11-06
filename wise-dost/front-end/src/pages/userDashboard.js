import TopBar from "../components/Layout/TopBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../utils/loading";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "User") {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, [navigate, location]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <TopBar />
    </>
  );
};

export default UserDashboard;
