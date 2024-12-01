const RecipeDetails = ({ ingredients, recipe, nutritionFacts }) => {
  return (
    <div className="row mt-5">
      <div className="col-lg-4 mb-4">
        <h3>Ingredients</h3>
        <ul>
          {ingredients.crust.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-8">
            <h3>Instructions</h3>
            <ol>
              {recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="col-lg-4">
            <h3>Nutrition Facts</h3>
            <ul>
              <li>Calories: {nutritionFacts.calories}</li>
              <li>Carbs: {nutritionFacts.carbs}</li>
              <li>Fat: {nutritionFacts.fat}</li>
              <li>Protein: {nutritionFacts.protein}</li>
              <li>Sugar: {nutritionFacts.sugar}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
