const RecipeDetails = ({ ingredients, recipe, nutritionFacts }) => {
  return (
    <div className="row mt-5">
      <div className="col-lg-2 mb-4 recipe-column">
        <h3>Ingredients</h3>
        <ul>
          {ingredients.crust.map((item, _id) => (
            <li key={_id}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-8 mb-4">
        <h3 className="instructions-title">Instructions</h3>
        <ol>
          {recipe.map((step, _id) => (
            <li key={_id}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="col-lg-2 mb-4">
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
  );
};
export default RecipeDetails;
