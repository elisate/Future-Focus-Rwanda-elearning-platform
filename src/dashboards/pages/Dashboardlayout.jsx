import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavPart from "./NavPart";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  let userToken = localStorage.getItem("userToken");
  if (!userToken) {
    return <Navigate to="/login" />;
  }

  userToken = JSON.parse(userToken);
  const userRole = userToken?.user?.role;

  if (userRole !== "isAdmin") {
    return <Navigate to="/dashboard" />;
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
