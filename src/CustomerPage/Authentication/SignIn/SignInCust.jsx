import React, { useContext, useEffect, useReducer, useState } from "react";
import "./SignInCust.css";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  auth,
} from "../../../Firebase/firebase";
import { defaultState, Modal, reducer } from "../SignUp/SignUp";
import { UserContext } from "../../../Context/userContext";
import { useNavigate } from "react-router-dom";
const SignInCust = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
        if (user != null) {
          navigate("/ecommerce");
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
      }
    );

    return () => unsubscribe();
  }, [setCurrentUser, navigate]);
  // Google Sign-In handler
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      await createUserDocumentFromAuth(user);
      setCurrentUser(user); // Make sure to set the current user
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by user");
        dispatch({ type: "POPUP_CLOSED_BY_USER" });
      } else {
        console.log(err);
        dispatch({ type: err.code });
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  // Email/Password Sign-In handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user);
      setCurrentUser(user); // Make sure to set the current user
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
        <button
          type="button"
          className="sign-up-button"
          onClick={logGoogleUser}
        >
          Sign In With Google
        </button>
      </form>
    </div>
  );
};

export default SignInCust;
