import React, { useReducer, useState } from "react";
import "./SignInCust.css";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../../Firebase/firebase";
import { defaultState, Modal, reducer } from "../SignUp/SignUp";
const SignInCust = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    createUserDocumentFromAuth(user);
  };

  console.log(logGoogleUser);

  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
    } catch (e) {
      console.log(e);
      dispatch({ type: e.code });
    }

    setEmail("");
    setPassword("");
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

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
        {state.isModalOpen && (
          <Modal modalContent={state.modalContent} closeModal={closeModal} />
        )}
        <button type="submit" className="sign-up-button">
          Sign In
        </button>
        <button className="sign-up-button" onClick={signInWithGooglePopUp}>
          Sign In With Google
        </button>
      </form>
    </div>
  );
};

export default SignInCust;
