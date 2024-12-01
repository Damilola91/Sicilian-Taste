import "./RecipePage.css";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import SimilarRecipes from "./SimilarRecipes";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";

const RecipePage = () => {
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Funzione per selezionare un prodotto casuale
  const getRandomProduct = (arr) =>
    arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

  // Selezioniamo un prodotto casuale
  const product = getRandomProduct(products);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {product ? (
          <>
            <RecipeHeader
              name={product.name}
              img={product.img}
              description={product.description}
            />
            <RecipeDetails
              ingredients={{
                crust: product.ingredients, // Mostra i primi 3 ingredienti come esempio
              }}
              recipe={product.recipe.split(".").map((step) => step.trim())} // Dividiamo e rimuoviamo spazi extra
              nutritionFacts={product.nutritionFacts}
            />
            <SimilarRecipes />
          </>
        ) : (
          !isLoading && <p>No products available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecipePage;
