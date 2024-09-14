import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavPart from "./NavPart";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  // Assuming a token and user role are stored in localStorage upon successful login
  const isAuthenticated = localStorage.getItem("userToken"); // Or any other logic for auth
  const userRole = localStorage.getItem("role"); // Retrieve user role from storage

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (userRole !== "isAdmin") {
    // If the user does not have the 'isAdmin' role, redirect to the landing page
    return <Navigate to="/landing" />;
  }

  return (
    <div>
      <NavPart />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
