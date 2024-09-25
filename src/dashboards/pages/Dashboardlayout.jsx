import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavPart from "./NavPart";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  // Retrieve token from localStorage
  let userToken = localStorage.getItem("userToken");

  // If no token, redirect to login
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // Parse token to retrieve user details
  try {
    userToken = JSON.parse(userToken);
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    localStorage.removeItem("userToken");
    return <Navigate to="/login" replace />;
  }

  const userRole = userToken?.user?.role;

  // Check if the user has the admin role
  if (userRole !== "isAdmin") {
    return <Navigate to="/landing" replace />;
  }

  return (
    <div className="dashboard-layout">
      <NavPart />
      <Sidebar />
      
        <Outlet />
     
    </div>
  );
}

export default DashboardLayout;
