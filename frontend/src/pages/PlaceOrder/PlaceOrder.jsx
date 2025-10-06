import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Clear error for that specific field on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const zipRegex = /^[0-9]{5,6}$/;

    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!emailRegex.test(data.email)) newErrors.email = "Enter a valid email address.";
    if (!data.street.trim()) newErrors.street = "Street address is required.";
    if (!data.city.trim()) newErrors.city = "City is required.";
    if (!data.state.trim()) newErrors.state = "State is required.";
    if (!zipRegex.test(data.zipcode)) newErrors.zipcode = "Enter a valid 5–6 digit zip code.";
    if (!data.country.trim()) newErrors.country = "Country is required.";
    if (!phoneRegex.test(data.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 20,
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Order could not be placed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="place-order-container">
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <div className="input-wrapper">
              <input
                name="firstName"
                value={data.firstName}
                onChange={onChangeHandler}
                type="text"
                placeholder="First Name"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="input-wrapper">
              <input
                name="lastName"
                value={data.lastName}
                onChange={onChangeHandler}
                type="text"
                placeholder="Last Name"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <input
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-wrapper">
            <input
              name="street"
              value={data.street}
              onChange={onChangeHandler}
              type="text"
              placeholder="Street"
            />
            {errors.street && <span className="error-text">{errors.street}</span>}
          </div>

          <div className="multi-fields">
            <div className="input-wrapper">
              <input
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                type="text"
                placeholder="City"
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="input-wrapper">
              <input
                name="state"
                value={data.state}
                onChange={onChangeHandler}
                type="text"
                placeholder="State"
              />
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>
          </div>

          <div className="multi-fields">
            <div className="input-wrapper">
              <input
                name="zipcode"
                value={data.zipcode}
                onChange={onChangeHandler}
                type="text"
                placeholder="Zip Code"
              />
              {errors.zipcode && <span className="error-text">{errors.zipcode}</span>}
            </div>

            <div className="input-wrapper">
              <input
                name="country"
                value={data.country}
                onChange={onChangeHandler}
                type="text"
                placeholder="Country"
              />
              {errors.country && <span className="error-text">{errors.country}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <input
              name="phone"
              value={data.phone}
              onChange={onChangeHandler}
              type="text"
              placeholder="Phone (10 digits)"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p> Delivery Fee  </p>
                <p>{getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "PROCEED TO PAYMENT"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
