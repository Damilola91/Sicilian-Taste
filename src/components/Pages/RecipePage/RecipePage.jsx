import "./RecipePage.css";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import SimilarRecipes from "./SimilarRecipes";

const RecipePage = () => {
  return (
    <div className="container mt-5">
      <RecipeHeader
        title="Strawberry Cream Cheesecake"
        image="https://via.placeholder.com/800x400"
        description="One thing I learned living in the Italian section of Brooklyn, NY, was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!"
      />
      <RecipeDetails
        ingredients={{
          crust: [
            "400g graham crackers",
            "50g granulated sugar",
            "150g unsalted butter, melted",
          ],
          filling: [
            "750g strawberries",
            "750g cream cheese, softened",
            "350ml heavy cream",
            "250g powdered sugar",
            "3 tbsp lemon juice",
            "3 drops red food gel",
          ],
        }}
        instructions={[
          "To prepare crust, add graham crackers to a food processor and process until you have fine crumbs.",
          "Pour mixture into a 20cm tin. Use the back of a spoon to firmly press the mixture, ensuring it's flat. Chill for 30 minutes.",
          "Blend the strawberries, then strain to remove seeds.",
          "Mix the cream cheese, powdered sugar, and heavy cream until smooth.",
          "Pour half the strawberry purée into the cream mixture and blend well.",
          "Pour the mix over the crust and refrigerate for 6 hours.",
        ]}
        nutrition={{
          calories: "370",
          carbs: "35g",
          fat: "18g",
          protein: "6g",
          sugar: "22g",
        }}
      />

      <SimilarRecipes />
    </div>
  );
};

export default RecipePage;
