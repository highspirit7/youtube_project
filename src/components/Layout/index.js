import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";

import "./layout.scss";

function Layout(props) {
  return (
    <div className="layout-container">
      <div className="contents">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
