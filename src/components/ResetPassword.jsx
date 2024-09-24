import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Send POST request to backend API
      const res = await axios.post(
        `https://future-focus-rwanada.onrender.com/api/reset/${token}`,
        { newPassword }
      );

      // Handle success
      if (res.data.success) {
        setMessage("Password reset successful!");
        // Redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
