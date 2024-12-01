import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducer/productSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productSlice.products);
  const isLoading = useSelector((state) => state.productSlice.isLoading);
  const error = useSelector((state) => state.productSlice.error);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const displayedProducts = products.slice(0, 4);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayedProducts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayedProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <header className="header">
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : displayedProducts.length === 0 ? (
        <div className="empty-message">No products available</div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="carousel-container">
                <div
                  className="carousel-image"
                  style={{
                    backgroundImage: `url(${displayedProducts[currentIndex].img})`,
                  }}
                >
                  <div className="carousel-content">
                    <p className="carousel-description">
                      {displayedProducts[currentIndex].description}
                    </p>
                    <h1 className="carousel-title">
                      {displayedProducts[currentIndex].name}
                    </h1>
                  </div>
                </div>
                <button className="carousel-button left" onClick={handlePrev}>
                  &#8249;
                </button>
                <button className="carousel-button right" onClick={handleNext}>
                  &#8250;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
