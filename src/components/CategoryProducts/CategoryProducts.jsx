import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByCategory,
  categorySearchProducts,
  categorySearchError,
  isProductLoading,
  categoryTotalPages,
  categoryTotalProducts,
} from "../../reducer/productSlice";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CategoryProducts.css";
import ResponsivePagination from "react-responsive-pagination";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(categorySearchProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(categorySearchError);
  const totalPages = useSelector(categoryTotalPages);
  const totalProducts = useSelector(categoryTotalProducts);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getProductsByCategory({
        category,
        page: currentPage,
        pageSize: 6,
      })
    );
  }, [dispatch, category, currentPage]);

  const handleCardClick = (_id) => {
    navigate(`/recipe/${_id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {}, [products, totalPages, totalProducts, error]);

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
