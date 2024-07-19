import React from "react";
import LeftNavBar from "../Components/navBarLeft/NavBarLeft";
import NavBarMiddle from "../Components/navBarMiddle/NavBarMiddle";
import NavBarRight from "../Components/navBarRight/NavBarRight";
import "./navBar.css";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="navBar-container">
        <div className="left-section">
          <LeftNavBar />
        </div>
        <div className="middle">
          <NavBarMiddle />
        </div>
        <div className="right-section">
          <NavBarRight />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
