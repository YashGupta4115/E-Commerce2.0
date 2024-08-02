import React, { useContext } from "react";
import { UserContext } from "../../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { signOutAuth } from "../../../Firebase/firebase";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./AuthDropDrop.css";

const AuthDropDown = () => {
  const {
    currentUser,
    setCurrentUser,
    isAuthDropDownOpen,
    setIsAuthDropDownOpen,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOutAuth(currentUser);
    setCurrentUser(null);
    navigate("/ecommerce");
  };

  return (
    <div className="auth-dropDown-container">
      <div className="navPopUp-title">
        <div>Auth</div>
        <IoIosCloseCircleOutline
          className="navPopUp-toggleIcon"
          onClick={() => setIsAuthDropDownOpen(!isAuthDropDownOpen)}
        />
      </div>
      <div className="options-section">
        <div
          className="options-section-individual-items"
          onClick={() => navigate("/ecommerce/serviceDesk")}
        >
          Raise a Issue
        </div>
        <div
          className="options-section-individual-items"
          onClick={() => navigate("/ecommerce/serviceDesk/allIssues")}
        >
          All issues
        </div>
      </div>
      <div>
        {currentUser ? (
          <button
            className="auth-login-button"
            type="button"
            onClick={signOutHandler}
          >
            LogOut
          </button>
        ) : (
          <button
            className="auth-login-button"
            type="button"
            onClick={() => navigate("/ecommerce/sign-in")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthDropDown;
