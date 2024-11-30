import React from "react";

const RecipeHeader = ({ title, image, description }) => {
  return (
    <header className="text-center mb-4">
      <h1 className="mb-3" style={{ fontFamily: "'Brush Script MT', cursive" }}>
        {title}
      </h1>
      <img src={image} alt={title} className="img-fluid rounded mb-3" />
      <p className="lead">{description}</p>
    </header>
  );
};

export default RecipeHeader;
