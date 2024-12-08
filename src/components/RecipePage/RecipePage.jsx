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
import CommentsSection from "./CommentSection";
import "./RecipePage.css";

const RecipePage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    if (!products.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products.length]);

  const getRandomProduct = (arr) =>
    arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

  // Se _id è presente nei parametri dell'URL, lo usiamo per trovare il prodotto
  const product = _id
    ? products.find((product) => product._id === _id)
    : getRandomProduct(products);

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
            <hr style={{ borderTop: "3px solid orange" }} />
            {/* Sezione Commenti */}
            <CommentsSection productId={product._id} />{" "}
            {/* Passiamo sempre _id del prodotto */}
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
