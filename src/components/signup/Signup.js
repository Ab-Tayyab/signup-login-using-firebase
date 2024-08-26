import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Signup.css";

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
  };

  const validate = () => {
    const newError = {};

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
        alert("User successfully registered!");
        setSignUpData({
          name: "",
          email: "",
          firstPassword: "",
          secondPassword: "",
        });
      } catch (error) {
        console.error("Error signing up:", error);
        setError({ firebase: error.message });
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={signUpData.name}
          onChange={handleChange}
        />
        <br />
        {error.name && <p className="error">{error.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={signUpData.email}
          onChange={handleChange}
        />
        <br />
        {error.email && <p className="error">{error.email}</p>}

        <input
          type="password"
          name="firstPassword"
          placeholder="Enter password"
          value={signUpData.firstPassword}
          onChange={handleChange}
        />
        <br />
        {error.firstPassword && <p className="error">{error.firstPassword}</p>}

        <input
          type="password"
          name="secondPassword"
          placeholder="Enter password"
          value={signUpData.secondPassword}
          onChange={handleChange}
        />
        <br />
        {error.secondPassword && (
          <p className="error">{error.secondPassword}</p>
        )}

        {error.firebase && <p className="error">{error.firebase}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
