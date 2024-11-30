import React from "react";

const SimilarRecipes = () => {
  const recipes = [
    { title: "Recipe 1", image: "https://via.placeholder.com/300x200" },
    { title: "Recipe 2", image: "https://via.placeholder.com/300x200" },
    { title: "Recipe 3", image: "https://via.placeholder.com/300x200" },
    { title: "Recipe 4", image: "https://via.placeholder.com/300x200" },
    { title: "Recipe 5", image: "https://via.placeholder.com/300x200" },
    { title: "Recipe 6", image: "https://via.placeholder.com/300x200" },
  ];

  return (
    <section className="mt-5">
      <h2 className="text-center mb-4">Other Recipes</h2>
      <div className="row g-3">
        {recipes.map((recipe, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title text-center">{recipe.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarRecipes;
