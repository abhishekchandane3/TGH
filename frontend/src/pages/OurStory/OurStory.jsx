import React from "react";
import "./OurStory.css";
import { assets } from "../../assets/assets"; // replace with your actual image

const OurStory = () => {
  return (
    <div className="ourstory-container">
      <div className="ourstory-content">
        <div className="ourstory-text">
          <h1 className="ourstory-title">Our Story</h1>
          <p className="ourstory-description">
            Welcome to <span>The Good Habit</span> — where taste meets wellness! 🌱  
            Our journey began with one goal: to make snacking both delicious and healthy.  
            From handpicked ingredients to sustainable packaging, every step reflects our passion
            for better food and a better planet.  
            <br /><br />
            Each bite you take is crafted with care, love, and goodness — because we believe 
            good habits start with good food. 🍫💖
          </p>
        </div>
        <div className="ourstory-image">
          <img src={assets.storyImage} alt="Our Story" />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
