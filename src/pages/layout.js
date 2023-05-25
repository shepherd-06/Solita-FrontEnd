import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../util/navbar";
import "../css/App.css";

const Layout = () => {
  return (
    <div className="main_bg">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
