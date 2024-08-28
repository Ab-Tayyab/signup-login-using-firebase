import React, { useState } from "react";
import { auth } from "./firebase"; 
import { confirmPasswordReset } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./userForm.css";
import { toast } from "react-toastify";



function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    if (!oobCode) {
      setError("Invalid or missing password reset code.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("");
      toast.success("Password has been reset successfully. Please login with your new password.")
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError("Failed to reset password. " + error.message);
    }
  };

  return (
    <div className="form-container-child">
        <h1 className="form-heading">Reset Password</h1>
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-input"
        />
        <br />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
        />
        <br />
        <button type="submit" className="btn">
          Reset Password
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ResetPassword;
