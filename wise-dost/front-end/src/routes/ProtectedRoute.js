import React from "react";
import { Route, Navigate } from "react-router-dom";
import { hasRequiredRole } from "../utils/roleUtils";

const ProtectedRoute = ({
  path,
  element: Element,
  isAuthenticated,
  requiredRole,
  userRole,
}) => {
  const userHasRequiredRole = hasRequiredRole(userRole, requiredRole);

  if (isAuthenticated && userHasRequiredRole) {
    return <Element />;
  } else if (isAuthenticated) {
    // If the user is authenticated but doesn't have the required role, redirect
    return <Navigate to="/unauthorized" replace />;
  } else {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
