import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar2.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import useOutsideClick from "../../hooks/useOutsideClick"; 

const Navbar = ({   }) => {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // 👈 toggle search box

  const { getTotalCartAmount, token, setToken,   food_list,  searchTerm, setSearchTerm } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // 🔹 Dropdown ke liye ref
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  // 🔹 Navbar menu ke liye ref
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setShowMenu(false));

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      {/* 🔹 Offer Strip */}
      <div className="offer-strip">
        10% OFF on all orders above ₹500 | Limited Time Offer
      </div>

      {/* 🔹 Navbar */}
      <div className="navbar2">
        {/* Left - Hamburger */}
        <div className="navbar-left">
          <img
            src={assets.logo}
            alt="Menu"
            className="logo"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>

        {/* Center - Brand OR Menu */}
        <div className="navbar-center">
          {!showMenu ? (
            <h3 className="brand-title">The Good Habit</h3>
          ) : (
            <ul
              ref={menuRef}
              className={`navbar-menu ${showMenu ? "show" : ""}`}
            >
              <li className="close-menu" onClick={() => setShowMenu(false)}>
                ✖
              </li>

              <li>
                <Link
                  to="/"
                  onClick={() => setMenu("home")}
                  className={menu === "home" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#our-story"
                  onClick={() => setMenu("ourstory")}
                  className={menu === "ourstory" ? "active" : ""}
                >
                  Our story
                </a>
              </li>
              <li>
                <a
                  href="#track-order"
                  onClick={() => setMenu("trackorder")}
                  className={menu === "trackorder" ? "active" : ""}
                >
                  Track order
                </a>
              </li>
              <li>
                <a
                  href="#review"
                  onClick={() => setMenu("review")}
                  className={menu === "review" ? "active" : ""}
                >
                  Review
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Right - Icons */}
        <div className="navbar-right"> 

          {/* 🔍 Search */}
          <div className="search-container">
            {showSearch && (
              <input
                type="text"
                className="search-input"
                placeholder="Search food, drinks..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  // ✅ Scroll to first matching product
                  const match = food_list.find(item =>
                    item.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  if (match) {
                    const element = document.getElementById(`food-${match._id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  } 
                }}
              />
            )}

            <img
              src={assets.search_icon}
              alt="Search"
              className="icon"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>


          {/* 👤 User */}
          {!token ? (
            <img
              src={assets.user_icon}
              alt="User"
              className="icon"
              onClick={() => navigate("/login")}   // ✅ direct page navigation
            />
          ) : (
            <div
              className="nav-bar-profile"
              onClick={() => setShowDropdown(!showDropdown)}
              ref={dropdownRef}
            >
              <img src={assets.profile_image} alt="" />
              <ul className={`nav-profile-dropdown ${showDropdown ? "show" : ""}`}>
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/myorders");
                  }}
                >
                  <img src={assets.orders} alt="orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={assets.logout} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}


          {/* 🛒 Cart */}
          <div className="navbar-basket-icon">
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
