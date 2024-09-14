import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavPart from "./NavPart";
import Sidebar from "./Sidebar";

function Dashboardlayout() {
  // Assuming a token is stored in localStorage upon successful login
  const isAuthenticated = localStorage.getItem("userToken"); // Or any other logic for auth

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavPart />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboardlayout;
