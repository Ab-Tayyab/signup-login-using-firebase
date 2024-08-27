import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./userForm.css";

function UserForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="form-container">
      <div className="form-container-child">
        {isLogin ? (
          <>
            <h1 className="form-heading">Login</h1>
            <p className="form-description">
              New Member? <span onClick={toggleForm}>Signup</span>
            </p>
            <Login />
          </>
        ) : (
          <>
            <h1 className="form-heading">Signup</h1>
            <p className="form-description">
              Already a Member? <span onClick={toggleForm}>Login</span>
            </p>
            <Signup />
          </>
        )}
      </div>
    </div>
  );
}

export default UserForm;
