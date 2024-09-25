import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavbarI from "./NavbarI";
import SidebarI from "./SidebarI";

const InstructorLayout = () => {
  // Retrieve token from localStorage
  let userToken = localStorage.getItem("userToken");

  // If no token, redirect to login
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // Parse the token to get user details
  try {
    userToken = JSON.parse(userToken);
  } catch (error) {
    // If token is invalid, remove it and redirect to login
    localStorage.removeItem("userToken");
    return <Navigate to="/login" replace />;
  }

  const userRole = userToken?.user?.role;

  // If the user role is not 'isInstructor', redirect to '/landing'
  if (userRole !== "isInstructor") {
    return <Navigate to="/landing" replace />;
  }

  return (
    <>
      <NavbarI />
      <SidebarI />
      <Outlet />
    </>
  );
};

export default InstructorLayout;
