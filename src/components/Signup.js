import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./userForm.css";
import { toast } from "react-toastify";

function Signup() {
  const [error, setError] = useState({});
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    firstPassword: "",
    secondPassword: "",
  });

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    if (error) setError({});
  };

  const validate = () => {
    const newError = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!signUpData.name) {
      newError.name = "Enter name";
    }

    if (!signUpData.email) {
      newError.email = "Enter email address";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newError.email = "Enter valid email address";
    }

    if (!signUpData.firstPassword) {
      newError.firstPassword = "Enter password";
    } else if (!passwordRegex.test(signUpData.firstPassword)) {
      newError.firstPasswordPattren =
        "Password should follow these pattren. (Password123!)";
    } else if (!signUpData.secondPassword) {
      newError.secondPassword = "Enter password";
    } else if (signUpData.firstPassword !== signUpData.secondPassword) {
      newError.secondPassword = "Passwords should be the same";
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorValidation = validate();
    setError(errorValidation);

    if (Object.keys(errorValidation).length === 0) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          signUpData.email,
          signUpData.firstPassword
        );
        toast.success("User successfully register!");
        setSignUpData({
          name: "",
          email: "",
          firstPassword: "",
          secondPassword: "",
        });
      } catch (error) {
        toast.error("Firebase authentication error!");
      }
    }
  };

  return (
    <div>
      <h1 className="form-heading">Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          autoComplete="off"
          value={signUpData.name}
          onChange={handleChange}
          className="form-input"
        />
        <br />
        {error.name && <p className="error">{error.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          autoComplete="off"
          value={signUpData.email}
          onChange={handleChange}
          className="form-input"
        />
        <br />
        {error.email && <p className="error">{error.email}</p>}

        <input
          type="password"
          name="firstPassword"
          placeholder="Enter password"
          value={signUpData.firstPassword}
          onChange={handleChange}
          className="form-input"
        />
        <br />
        {error.firstPassword && <p className="error">{error.firstPassword}</p>}
        {error.firstPasswordPattren && (
          <p className="error">{error.firstPasswordPattren}</p>
        )}

        <input
          type="password"
          name="secondPassword"
          placeholder="Enter password"
          value={signUpData.secondPassword}
          onChange={handleChange}
          className="form-input"
        />
        <br />
        {error.secondPassword && (
          <p className="error">{error.secondPassword}</p>
        )}

        {/* {error.firebase && <p className="error">{error.firebase}</p>} */}

        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
