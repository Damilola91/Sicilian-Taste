import "./RecipePage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import SimilarRecipes from "./SimilarRecipes";

const RecipePage = () => {
  const { _id } = useParams(); // Raccogli il parametro id (se presente)
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    if (!products.length) {
      dispatch(getAllProducts()); // Carica i prodotti se non sono ancora disponibili
    }
  }, [dispatch, products.length]);

  const getRandomProduct = (arr) =>
    arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

  const product = _id
    ? products.find((product) => product._id === _id) // Trova il prodotto dall'id
    : getRandomProduct(products); // Se id non è presente, seleziona un prodotto casuale

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
                crust: product.ingredients,
              }}
              recipe={product.recipe.split(".").map((step) => step.trim())}
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
