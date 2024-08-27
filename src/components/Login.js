import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import "./userForm.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setMessage("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage("Password reset email sent. Please check your inbox.");
      setResetEmail("");
    } catch (error) {
      setMessage("Failed to send password reset email.");
    }
  };

  return (
    <div>
      {!showForgotPassword ? (
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
          {error.firebase && <p className="error">{error.firebase}</p>}
          <p onClick={() => setShowForgotPassword(true)} className="forgot-password-link">
            Forgot Password?
          </p>
        </form>
      ) : (
        <div className="reset-password-section">
          <input
            type="email"
            placeholder="Enter your email for password reset"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="form-input"
          />
          <button onClick={handleResetPassword} className="btn">
            Reset Password
          </button>
          {message && <p className="message">{message}</p>}
          <button onClick={() => setShowForgotPassword(false)} className="btn back-to-login">
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
