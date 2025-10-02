import React, { useRef, useContext } from "react";
import "./ProductSlide.css";
import { StoreContext } from "../../context/StoreContext";

const ProductSlides = () => {
  const sliderRef = useRef(null);
  const { food_list, cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="product-slides">
      <h2 className="section-title">Our Popular Products</h2>

      {/* Slide Buttons */}
      <div className="slide-buttons">
        <button onClick={slideLeft} className="slide-btn">{"<"}</button>
        <button onClick={slideRight} className="slide-btn">{">"}</button>
      </div>

      {/* Product Row */}
      <div className="product-container" ref={sliderRef}>
        {food_list.length > 0 ? (
          food_list.slice(0, 15).map((product) => (
            <div className="product-card" key={product._id}>
              {/* Product Image Section */}
              <div className="product-img-wrapper">
                <img
                  src={`${url}/images/${product.image}`} 
                  alt={product.name}
                  className="product-img"
                />
              </div>

              {/* Product Info Section */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-rating">
                    {"★".repeat(product.rating || 4)}
                    {"☆".repeat(5 - (product.rating || 4))}
                  </span>
                </div>

                {/* Cart Counter Section */}
                <div className="cart-action">
                  {!cartItems[product._id] ? (
                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="product-counter-product-slide">
                      <span
                        className="product-counter-product-slide-counter-btn"
                        onClick={() => removeFromCart(product._id)}
                      >
                        −
                      </span>
                      <span className="counter-value">{cartItems[product._id]}</span>
                      <span
                        className="product-counter-product-slide-counter-btn"
                        onClick={() => addToCart(product._id)}
                      >
                        +
                      </span>
                    </div>
                  )}
                </div>




              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductSlides;
