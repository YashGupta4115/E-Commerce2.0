import React, { useEffect, useState } from "react";
import "./Home.css";
import logo from "../../Assests/logo.svg";
import userLogo from "../../Assests/Designer.jpeg";
import adminLogo from "../../Assests/Designer (1).jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  const [titleTransition, setTitleTransition] = useState("titleStable");
  useEffect(() => {
    setTimeout(() => {
      setTitleTransition("transform");
    }, 1000);
  }, [setTitleTransition]);
  return (
    <div className="home-container">
      <img className="logo" src={logo} alt="logo" />
      <div className="background-black-screen"></div>
      <div className="choice-container">
        <Link to="/ecommerce">
          <div className="choice transition1">
            <img className="choice-logo" src={userLogo} alt="userLogo" />
            {<span className={titleTransition}>Customer</span>}
          </div>
        </Link>
        <Link to="/adminAuth">
          <div className="choice transition2" target="blank">
            <img className="choice-logo" src={adminLogo} alt="adminLogo" />
            {<span className={titleTransition}>Admin</span>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
