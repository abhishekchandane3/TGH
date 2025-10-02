import React, { useContext, useState } from "react";
import "./Register.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const onRegister = async (e) => {
    e.preventDefault();
    // ✅ Password Validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setError("Password must have at least 6 chars, 1 number, 1 special char.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/register`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <form onSubmit={onRegister} className="register-container">
        <h2>Register</h2>

        <input
          name="name"
          type="text"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Name"
          required
        />
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
          {loading ? "Please wait..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
