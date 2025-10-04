import React, { useState, useEffect } from "react";
import "./Header.css";

// 👇 Replace with your real images
import foodImage1 from "../../assets/food.png";
import foodImage2 from "../../assets/food3.png";
import foodImage3 from "../../assets/food.png";
import foodImage4 from "../../assets/food2.jpeg";

const Header = () => {
  const images = [foodImage1, foodImage2, foodImage3, foodImage4];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="header">
      <div className="header-carousel">
        <img
          src={images[currentIndex]}
          alt="Food Carousel"
          className="header-image"
        />
        <div className="header-overlay">
          <h1 className="header-title">
            High  Protein  <br /> Whole Date Chocolate
          </h1>
          <p className="header-subtitle">
            For EveryDay Snacking
            <br />
            A small step today makes a big change tomorrow.
          </p>
          <button className="header-btn">Order Now</button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
