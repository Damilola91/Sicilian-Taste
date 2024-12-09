import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../../reducer/cartSlice";
import { createReview } from "../../reducer/reviewsSlice";
import { Star, StarHalf } from "lucide-react";
import useSession from "../../hooks/useSession";
import { selectReviewsByProduct } from "../../reducer/reviewsSlice";
import { useNavigate } from "react-router-dom";
import "./SuperDelicious.css"; // Assicurati che il CSS venga caricato correttamente

const SuperDelicious = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);
  const reviewsByProduct = useSelector(selectReviewsByProduct);
  const session = useSession();
  const navigate = useNavigate();

  const [selectedRating, setSelectedRating] = useState({});
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setRandomProducts(shuffled.slice(0, 8));
  }, [products]);

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

  return (
    <section>
      <h2 className="super-delicious-title">Super Delicious</h2>
      <div className="super-delicious-grid">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => {
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
                    <div className="super-delicious-rating">
                      <strong>Rating:</strong>
                      <div className="super-delicious-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => handleRating(product._id, star)}
                            style={{ cursor: "pointer" }}
                          >
                            {userRating >= star ? (
                              <Star color="gold" />
                            ) : userRating >= star - 0.5 ? (
                              <StarHalf color="gold" />
                            ) : (
                              <Star color="lightgray" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="super-delicious-price">
                      €
                      {parseFloat(
                        product.price.$numberDecimal.toString()
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="super-delicious-footer">
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
          <p>Non ci sono prodotti disponibili.</p>
        )}
      </div>
    </section>
  );
};

export default SuperDelicious;
