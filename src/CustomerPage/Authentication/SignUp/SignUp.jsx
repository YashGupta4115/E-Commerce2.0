import React, { useEffect, useReducer, useState } from "react";
import "./SignUp.css";

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

const reducer = (state, action) => {
  if (action.type === "PASSWORD_NOT_MATCHING") {
    return {
      isModalOpen: true,
      modalContent: "password does not match",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      isModalOpen: false,
      modalContent: "",
    };
  }
};

const defaultState = {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      dispatch({ type: "PASSWORD_NOT_MATCHING" });
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
