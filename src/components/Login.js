import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import "./userForm.css";
import { toast } from "react-toastify";


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
        await signInWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        );
        toast.success("Login successfull!")
        setLoginData({
          email: "",
          password: "",
        });
      } catch (error) {
        toast.error("Firebase authenication error!")
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
      toast.success("Password reset email sent. Please check your inbox.")
      setResetEmail("");
    } catch (error) {
      toast.error("Failed to send password reset email.")
    }
  };

  return (
    <div>
      {!showForgotPassword ? (
        <div>
          <h1 className="form-heading">Login</h1>
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
            <p
              onClick={() => setShowForgotPassword(true)}
              className="forgot-password-link form-description"
            >
              Forgot Password?
            </p>
          </form>
        </div>
      ) : (
        <div className="reset-password-section">
      <h1 className="form-heading">Confirm Email</h1>
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
          <button
            onClick={() => setShowForgotPassword(false)}
            className="btn back-to-login"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
