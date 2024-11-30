import React from "react";

const recipes = [
  { title: "Delicious Fancy Glazed Blueberry Donuts", rating: 4.5 },
  { title: "Pan Fried Cod in Creamy Kale Sauce", rating: 4.7 },
  { title: "Berry Madness Biscuits", rating: 4.2 },
  { title: "Four Ingredient Oatmeal Pancakes", rating: 4.8 },
  { title: "Pumpkin Marshmallow Pie and Nuts", rating: 4.6 },
  { title: "Mighty Cheesy Breakfast Burger", rating: 4.9 },
];

const SuperDelicious = () => {
  return (
    <section>
      <h2 className="text-center mb-4">Super Delicious</h2>
      <div className="row g-4">
        {recipes.map((recipe, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100">
              <img
                src="https://via.placeholder.com/150"
                alt={recipe.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  <strong>Rating:</strong> {recipe.rating} ★
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuperDelicious;
