import React, { useContext, useEffect, useReducer, useState } from "react";
import "./SignIn.css";
import {
  SignOutAuth,
  auth,
  signInAuthWithEmailAndPassword,
} from "../firebase/firbase.utils";
import App from "../../App";
import { EmpContext } from "../../Context/userContext";

const reducer = (state, action) => {
  if (action.type === "NO_EMAIL") {
    return {
      ...state,
      isModalOpen: true,
      message: "Enter Email Id",
    };
  }
  if (action.type === "NO_PASSWORD") {
    return {
      ...state,
      isModalOpen: true,
      message: "Enter Password",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "WRONG_PASSWORD") {
    return {
      ...state,
      isModalOpen: true,
      message: "Wrong Password",
    };
  }
  if (action.type === "USER_NOT_FOUND") {
    return {
      ...state,
      isModalOpen: true,
      message: "User not found",
    };
  }

  if (action.type === "USER_AUTHENTICATED") {
    return <App />;
  }
};

const defaultState = {
  email: "",
  password: "",
  isModalOpen: false,
  message: "",
};

const Modal = ({ message, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  });
  return <span style={{ color: "red" }}>{message}</span>;
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);

  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      dispatch({ type: "NO_EMAIL" });
    }
    if (!password) {
      dispatch({ type: "NO_PASSWORD" });
    }
    signInAuthWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        dispatch({ type: "WRONG_PASSWORD" });
      } else {
        dispatch({ type: "USER_NOT_FOUND" });
      }
      console.log(error);
      //   document.getElementById("sign-in-button").disabled = false;
    });
    // document.getElementById("sign-in-button").disabled = true;
    setEmail("");
    setPassword("");
    // console.log(auth.currentUser);
    SignOutAuth(auth);
    // console.log(auth.currentUser);
  };

  const { currentUser } = useContext(EmpContext);  

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "USER_AUTHENTICATED" });
    }
  });

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div className="sign-in-container">
      <div className="decorator">
        <span className="login-title">LOGIN</span>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {state.isModalOpen && (
          <Modal closeModal={closeModal} message={state.message} />
        )}
        <button id="sign-in-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignIn;
