import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ new state
  const [showPassword, setShowPassword] = useState(false); // 👁 state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    setError(""); // ✅ clear error when typing
  };

  const onLogin = async (event) => {
    event.preventDefault();

    // ✅ Password Validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setError("Password must be at least 6 characters, include 1 number and 1 special character.");
      return; // ❌ Stop API call
    }

    setLoading(true);
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setError(response.data.message); // ✅ show server error also here
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  // 🔴 Handle click outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("login-popup")) {
      setShowLogin(false);
    }
  };

  return (
    <div className='login-popup' onClick={handleOutsideClick}>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
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
          {/* ✅ Error message here */}
          {error && <p className="error-text">{error}</p>}
        </div>


        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : (currState === "Sign Up" ? "Create Account" : "Login")}
        </button>

        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>Accept Terms and Conditions</p>
        </div>

        {currState === "Login" ? (
          <p className='login-popup-forgot'>
            Create a New Account ?
            <span onClick={() => setCurrState("Sign Up")}> Click Here</span>
          </p>
        ) : (
          <p className='login-popup-forgot'>
            Already have an Account ?
            <span onClick={() => setCurrState("Login")}> Login Here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
