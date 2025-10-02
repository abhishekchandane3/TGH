import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./ResetPassword.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  var { url } = useContext(StoreContext);
  let url = "https://tgh-backend.onrender.com";
  const { token } = useParams(); // url se token read hoga
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirm) {
      setError("⚠️ Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/user/reset-password/${token}`, {
        password,
      });

      if (res.data.success) {
        setMessage("✅ Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("⚠️ Error resetting password.");
    }
  };


  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-container">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button type="submit">Reset Password</button>

        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
