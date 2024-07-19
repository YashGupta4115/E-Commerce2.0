import React, { useState } from "react";
import "./SignInCust.css";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../../Firebase/firebase";
import SignUp from "../SignUp/SignUp";
const SignInCust = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    createUserDocumentFromAuth(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign-in-for-customer-container">
      <form className="cust-sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sign-up-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInCust;
