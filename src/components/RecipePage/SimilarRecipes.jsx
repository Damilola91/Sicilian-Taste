import { useSelector } from "react-redux";
import {
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";

const SimilarRecipes = () => {
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  // Funzione per ottenere prodotti casuali
  const getRandomProducts = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomRecipes =
    products && products.length > 0 ? getRandomProducts(products, 6) : [];

  return (
    <section className="mt-5">
      <h2 className="text-center mb-4">Other Recipes</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-3">
        {randomRecipes.length > 0
          ? randomRecipes.map((recipe, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="card">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-name text-center">{recipe.name}</h5>
                  </div>
                </div>
              </div>
            ))
          : !isLoading && <p>No similar recipes available.</p>}
      </div>
    </section>
  );
};

export default SimilarRecipes;
