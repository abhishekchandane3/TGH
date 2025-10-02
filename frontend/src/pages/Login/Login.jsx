import React, { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/login`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect to home or dashboard
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form onSubmit={onLogin} className="login-container">
        <h2>Login</h2>

        <input
          name="email"
          type="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email"
          required
        />

        <div className="password-wrapper">
        <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
        />
        <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        </div> 

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>

        <p>
         <Link to="/forget-password">Forgot Password?</Link>
        </p>

        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
