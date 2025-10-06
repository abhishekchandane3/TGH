import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/category/list");
        if (res.data.success) {
          setMenuList(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1 className="explore-menu-title">Explore Our Menu / Products</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

    <div className="scroll-controls">
    <div className="explore-menu-list">
        {menuList.map((item, index) => (
        <div
            key={index}
            className={`explore-menu-item ${
            category === item.name ? "active" : ""
            }`}
            onClick={() =>
            setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
        >
            <div className="image-wrapper">
            <img
                src={`http://localhost:4000/uploads/${item.image}`}
                alt={item.name}
            />
            </div>
            <p>{item.name}</p>
        </div>
        ))}
    </div>

    {/* ✅ Bottom Scroll Buttons */}
    <div className="scroll-buttons-bottom">
        <button
        className="scroll-btn"
        onClick={() =>
            document
            .querySelector(".explore-menu-list")
            .scrollBy({ left: -250, behavior: "smooth" })
        }
        >
        {"<"}
        </button>
        <button
        className="scroll-btn"
        onClick={() =>
            document
            .querySelector(".explore-menu-list")
            .scrollBy({ left: 250, behavior: "smooth" })
        }
        >
        {">"}
        </button>
    </div>
    </div>


      
    </div>
  );
};

export default ExploreMenu;
