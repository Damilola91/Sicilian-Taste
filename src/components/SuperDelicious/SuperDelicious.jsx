import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../../reducer/cartSlice";
import { createReview } from "../../reducer/reviewsSlice";
import { Star } from "lucide-react";
import useSession from "../../hooks/useSession";
import { selectReviewsByProduct } from "../../reducer/reviewsSlice";
import { useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import {
  getPaginatedProducts,
  paginatedProducts,
  paginatedTotalPages,
  currentPage,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";
import "./SuperDelicious.css";

const SuperDelicious = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSession();

  // Selettori per la paginazione
  const products = useSelector(paginatedProducts);
  const totalPagesCount = useSelector(paginatedTotalPages);
  const currentPageNumber = useSelector(currentPage);
  const isLoading = useSelector(isProductLoading); // Usa il selettore per il caricamento
  const error = useSelector(errorProduct);

  const reviewsByProduct = useSelector(selectReviewsByProduct);

  const [selectedRating, setSelectedRating] = useState({});

  useEffect(() => {
    dispatch(getPaginatedProducts({ page: 1, pageSize: 8 }));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: parseFloat(product.price.$numberDecimal.toString()).toFixed(2),
      img: product.img,
    };
    dispatch(addToCart(productToAdd));
  };

  const handleRating = (productId, rating) => {
    if (!session || !session._id) {
      alert("Devi essere loggato per lasciare una recensione!");
      return;
    }

    const reviewData = {
      rating,
      user: session._id,
      product: productId,
    };

    dispatch(createReview(reviewData));

    setSelectedRating((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  const getProductRating = (productId) => {
    const reviews = reviewsByProduct[productId] || [];
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        : 0;
    return averageRating;
  };

  const handleCardClick = (_id) => {
    navigate(`/recipe/${_id}`);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(getPaginatedProducts({ page: pageNumber, pageSize: 8 }));
  };

  return (
    <section className="super-delicious-container">
      <h2 className="super-delicious-title">Super Delicious</h2>
      <div className="super-delicious-grid">
        {isLoading ? (
          <p>Caricamento...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => {
            const productRating = getProductRating(product._id);
            const userRating = selectedRating[product._id] || productRating;

            return (
              <div key={product._id} className="super-delicious-card">
                <div className="super-delicious-card-inner">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="super-delicious-image"
                    onClick={() => handleCardClick(product._id)}
                  />
                  <div className="super-delicious-body">
                    <h5 className="super-delicious-name">{product.name}</h5>
                    <p className="super-delicious-description">
                      {product.description}
                    </p>
                    <div className="super-delicious-price">
                      <span>
                        Price:
                        {parseFloat(
                          product.price.$numberDecimal.toString()
                        ).toFixed(2)}
                        €
                      </span>
                    </div>
                    <div className="super-delicious-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < userRating
                              ? "super-delicious-full-star selected"
                              : "super-delicious-empty-star"
                          }
                          onClick={() => handleRating(product._id, i + 1)}
                        >
                          <Star />
                        </span>
                      ))}
                    </div>
                    <p className="super-delicious-stock">
                      Available:{product.availableInStock.$numberDecimal}
                    </p>

                    <button
                      className="super-delicious-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Aggiungi al carrello
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Nessun prodotto trovato</p>
        )}
      </div>
      {totalPagesCount > 1 && (
        <div className="super-delicious-pagination">
          <ResponsivePagination
            current={currentPageNumber}
            total={totalPagesCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default SuperDelicious;
