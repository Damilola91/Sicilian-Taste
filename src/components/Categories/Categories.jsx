import "./Categories.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook per navigare

  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Estrai le categorie uniche dai prodotti
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Funzione per ottenere l'immagine della categoria
  const getCategoryImage = (category) => {
    const product = products.find((product) => product.category === category);
    return product
      ? product.img
      : "https://via.placeholder.com/150?text=No+Image";
  };

  // Funzione per navigare alla pagina della categoria
  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <div className="categories-page container my-5">
      <h2 className="text-center mb-4">Categories</h2>
      <div className="row justify-content-center gy-3">
        {/* Messaggi di caricamento o errore */}
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Renderizza le categorie */}
        {!isLoading && !error && categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={index}
              className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
              onClick={() => handleCategoryClick(category)} // Naviga alla categoria
              style={{ cursor: "pointer" }} // Aggiunge il puntatore
            >
              <div className="category-item">
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="rounded-circle img-fluid category-image"
                />
                <p className="category-name mt-1">{category}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
