import React, { useState } from "react";
import "./Header.css";

const images = [
  {
    src: "https://via.placeholder.com/1200x600",
    title: "Cinnamon Apple Loaded Tart",
    description: "85% would make this again",
  },
  {
    src: "https://via.placeholder.com/1200x600/FFB6C1",
    title: "Delicious Chocolate Cake",
    description: "90% would make this again",
  },
  {
    src: "https://via.placeholder.com/1200x600/ADD8E6",
    title: "Fresh Summer Salad",
    description: "75% would make this again",
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="carousel-container">
              <div
                className="carousel-image"
                style={{ backgroundImage: `url(${images[currentIndex].src})` }}
              >
                <div className="carousel-content">
                  <p className="carousel-description">
                    {images[currentIndex].description}
                  </p>
                  <h1 className="carousel-title">
                    {images[currentIndex].title}
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
    </header>
  );
};

export default Header;
