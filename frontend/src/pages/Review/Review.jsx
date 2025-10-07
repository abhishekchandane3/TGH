import React, { useState } from 'react';
import './Review.css';

const Review = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // later: send data to backend
  };

  return (
    <div className="review-container">
      <h1>Customer Reviews</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>✅ Thanks {name}! Your review has been submitted.</p>
      )}
    </div>
  );
};

export default Review;
