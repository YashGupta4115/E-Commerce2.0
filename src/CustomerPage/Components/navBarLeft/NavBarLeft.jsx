import React from "react";
import logo from "../../../Assests/logo.svg";
import "./NavBarLeft.css";

const NavBarLeft = () => {
  return (
    <div className="left-section-container">
      <div className="logo-container">
        <img className="logo-image" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NavBarLeft;
