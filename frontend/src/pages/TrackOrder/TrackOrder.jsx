import React, { useState } from 'react';
import './TrackOrder.css';
import { assets } from "../../assets/assets"; // replace with your actual image

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');

  const handleTrack = () => {
    if (orderId.trim() === '') {
      setStatus('Please enter a valid Order ID 📝');
      return;
    }

    // Mock response — replace later with backend API call
    if (orderId === '12345') {
      setStatus('🚚 Your order is Out for Delivery!');
    } else if (orderId === '67890') {
      setStatus('✅ Your order has been Delivered!');
    } else {
      setStatus('❌ Order not found. Please check your ID.');
    }
  };

  return (
    <div className="trackorder-section">
      <div className="trackorder-container">
        <div className="trackorder-left">
          <h1>Track Your Order</h1>
          <p className="trackorder-text">
            Enter your <span>Order ID</span> to get real-time updates on your order status.
          </p>

          <div className="trackorder-form">
            <input
              type="text"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={handleTrack}>Track</button>
          </div>

          {status && <p className="order-status">{status}</p>}
        </div>

        <div className="trackorder-right">
          <img src={assets.storyImage} alt="Track Order Illustration" />
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
