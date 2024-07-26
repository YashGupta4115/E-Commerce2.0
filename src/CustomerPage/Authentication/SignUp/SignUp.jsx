import React, { useEffect, useReducer, useState } from "react";
import "./SignUp.css";
import { createAuthUserWithEmailAndPassword } from "../../../Firebase/firebase";

export const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  });

  return (
    <div>
      <p>{modalContent}</p>
    </div>
  );
};

export const reducer = (state, action) => {
  if (action.type === "PASSWORD_NOT_MATCHING") {
    return {
      isModalOpen: true,
      modalContent: "Passwords does not match",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      isModalOpen: false,
      modalContent: "",
    };
  }
  if (action.type === "Firebase: Error (auth/email-already-in-use).") {
    return {
      isModalOpen: true,
      modalContent: "Email already in use",
    };
  }
  if (
    action.type ===
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return {
      isModalOpen: true,
      modalContent: "Password must be of atleast 6 characters",
    };
  }

  if ((action.type = "auth/invalid-credential")) {
    return {
      isModalOpen: true,
      modalContent: "Invalid credential",
    };
  }
};

export const defaultState = {
  isModalOpen: false,
  modalContent: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      dispatch({ type: "PASSWORD_NOT_MATCHING" });
    } else {
      try {
        const response = await createAuthUserWithEmailAndPassword(
          formData.email,
          formData.password
        );

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          displayName: "",
        });
      } catch (error) {
        console.log("user creation error", error.message);
        dispatch({ type: error.message });
      }
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div className="cust-sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            placeholder="UserName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {state.isModalOpen && (
          <Modal modalContent={state.modalContent} closeModal={closeModal} />
        )}
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
