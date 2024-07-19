import React from "react";
import SignUp from "../SignUp/SignUp";
import SignInCust from "../SignIn/SignInCust";
import "./SignInUpPage.css";

const SignInUpPage = () => {
  return (
    <div className="sign-in-up-page-container">
      <SignInCust />
      <SignUp />
    </div>
  );
};

export default SignInUpPage;
