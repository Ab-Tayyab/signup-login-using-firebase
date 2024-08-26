import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./userForm.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newError = {};
    if (!loginData.email) {
      newError.email = "Enter email";
    }
    if (!loginData.password) {
      newError.password = "Enter password";
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValidation = validate();
    setError(errorValidation);
    if (Object.keys(errorValidation).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        alert("Login successful!");
        setLoginData({
          email: "",
          password: "",
        });
      } catch (error) {
        setError({ firebase: error.message });
        setLoginData({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={loginData.email}
          onChange={handleChange}
          className="form-input"
        />
        {error.email && <p className="error">{error.email}</p>}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="form-input"
        />
        {error.password && <p className="error">{error.password}</p>}
        <br />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      {error.firebase && <p className="error">{error.firebase}</p>}
    </div>
  );
}

export default Login;
