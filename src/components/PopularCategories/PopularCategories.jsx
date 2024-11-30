import React from "react";

const PopularCategories = () => {
  const categories = [
    "Pasta",
    "Pizza",
    "Vegan",
    "Desserts",
    "Smoothies",
    "Breakfast",
  ];

  return (
    <section className="text-center mb-5 popular-categories">
      <h2>Popular Categories</h2>
      <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
        {categories.map((category, index) => (
          <div key={index} className="text-center">
            <img
              src={`https://via.placeholder.com/80?text=${category}`}
              alt={category}
              className="rounded-circle mb-2"
            />
            <p>{category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
