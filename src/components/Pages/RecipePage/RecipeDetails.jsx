import React from "react";

const RecipeDetails = ({ ingredients, instructions, nutrition }) => {
  return (
    <div className="row mt-5">
      {/* Ingredienti */}
      <div className="col-lg-4 mb-4">
        <h3>Ingredients</h3>
        <h5>For the crust:</h5>
        <ul>
          {ingredients.crust.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h5>For the cheesecake:</h5>
        <ul>
          {ingredients.filling.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Wrapper per le Istruzioni e i Fatti Nutrizionali */}
      <div className="col-lg-8">
        <div className="row">
          {/* Istruzioni */}
          <div className="col-lg-8">
            <h3>Instructions</h3>
            <ol>
              {instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Fatti nutrizionali */}
          <div className="col-lg-4">
            <h3>Nutrition Facts</h3>
            <ul>
              <li>Calories: {nutrition.calories}</li>
              <li>Carbs: {nutrition.carbs}</li>
              <li>Fat: {nutrition.fat}</li>
              <li>Protein: {nutrition.protein}</li>
              <li>Sugar: {nutrition.sugar}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
