import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import UserForm from "./components/userForm";
import './components/userForm.css'

function App() {
  return (
    <div className="background-image">
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
