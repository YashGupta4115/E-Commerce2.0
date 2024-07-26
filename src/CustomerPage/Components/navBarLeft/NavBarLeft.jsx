import React from "react";
import logo from "../../../Assests/logo.svg";
import "./NavBarLeft.css";
import { useNavigate } from "react-router-dom";

const NavBarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="left-section-container">
      <div
        style={{ cursor: "pointer" }}
        className="logo-container"
        onClick={() => navigate("/ecommerce")}
      >
        <img className="logo-image" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NavBarLeft;
