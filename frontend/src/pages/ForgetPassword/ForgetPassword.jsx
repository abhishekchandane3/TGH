import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./ForgetPassword.css"; // same css use kar sakte ho jo login/register ke liye hai
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${url}/api/user/forgot-password`, { email });

      if (res.data.success) {
        setMessage("✅ " + res.data.message);
      } else if(res.data.success === false) {
        setError(res.data.message); // backend ka error dikhayega
      }

    } catch (err) {
      // Yaha pe backend ke error response ko bhi handle kar
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("⚠️ Error sending reset link.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-container">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
