import React from "react";
import { Outlet } from "react-router-dom";
import NavbarI from "./NavbarI";
import SidebarI from "./SidebarI";

const InstuctorLayout = () => {
    return (
        <>
            <NavbarI />
            <SidebarI />
            <Outlet/>
        </>
    )
}
export default InstuctorLayout;