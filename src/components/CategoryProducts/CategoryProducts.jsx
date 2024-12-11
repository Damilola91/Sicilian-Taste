import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByCategory, // Importa il thunk corretto
  categorySearchProducts,
  categorySearchError,
  isProductLoading,
  categoryTotalPages, // Numero totale di pagine per categoria
  categoryTotalProducts, // Numero totale di prodotti per categoria
} from "../../reducer/productSlice";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CategoryProducts.css";
import ResponsivePagination from "react-responsive-pagination";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(categorySearchProducts); // Prodotti per categoria
  const isLoading = useSelector(isProductLoading); // Stato di caricamento
  const error = useSelector(categorySearchError); // Errore nella ricerca
  const totalPages = useSelector(categoryTotalPages); // Numero totale di pagine per categoria
  const totalProducts = useSelector(categoryTotalProducts); // Numero totale di prodotti per categoria

  // Stato locale per la pagina corrente
  const [currentPage, setCurrentPage] = useState(1);

  // Effettua la chiamata all'API quando il componente si carica o quando la pagina cambia
  useEffect(() => {
    console.log("Fetching products for page:", currentPage); // Debugging
    dispatch(
      getProductsByCategory({
        category,
        page: currentPage,
        pageSize: 6, // Numero di prodotti per pagina
      })
    );
  }, [dispatch, category, currentPage]);

  // Gestione del click su una card prodotto
  const handleCardClick = (_id) => {
    navigate(`/recipe/${_id}`);
  };

  // Gestione del cambio pagina
  const handlePageChange = (page) => {
    console.log("Page changed to:", page); // Debugging
    setCurrentPage(page);
  };

  // Debugging: log dei dati nel Redux store
  useEffect(() => {
    console.log("Products:", products);
    console.log("Total Pages:", totalPages);
    console.log("Total Products:", totalProducts);
    console.log("Error:", error);
  }, [products, totalPages, totalProducts, error]);

  return (
    <>
      <Navbar />
      <div className="category-products container my-5">
        <h2 className="text-center mb-4">
          Prodotti nella categoria "{category}"
        </h2>
        {isLoading && <p>Caricamento in corso...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && products.length > 0 ? (
          <div className="row gy-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
              >
                <div
                  className="product-item"
                  onClick={() => handleCardClick(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="img-fluid product-image"
                  />
                  <p className="product-name mt-1">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nessun prodotto disponibile in questa categoria.</p>
        )}

        {/* Mostra la paginazione solo se ci sono più di una pagina */}
        {totalPages > 1 && totalProducts > 6 && (
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
