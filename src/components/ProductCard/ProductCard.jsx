import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducer/cartSlice";
import {
  createReview,
  selectReviewsByProduct,
} from "../../reducer/reviewsSlice";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSession();

  const reviewsByProduct = useSelector(selectReviewsByProduct);
  const [selectedRating, setSelectedRating] = useState({});

  const handleAddToCart = (product) => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: parseFloat(product.price.$numberDecimal).toFixed(2),
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

  const productRating = getProductRating(product._id);
  const userRating = selectedRating[product._id] || productRating;

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <img
          src={product.img}
          alt={product.name}
          className="product-card-img"
          onClick={() => handleCardClick(product._id)}
        />
        <div className="product-card-body">
          <h5 className="product-card-title">{product.name}</h5>
          <p className="product-card-description">{product.description}</p>
          <div className="product-card-price">
            <span>
              Price: €{parseFloat(product.price.$numberDecimal).toFixed(2)}
            </span>
          </div>
          <div className="product-card-rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < userRating
                    ? "product-card-full-star selected"
                    : "product-card-empty-star"
                }
                onClick={() => handleRating(product._id, i + 1)}
              >
                <Star />
              </span>
            ))}
          </div>
          <p className="product-card-stock">
            Available: {parseFloat(product.availableInStock.$numberDecimal)}
          </p>
          <button
            className="product-card-button"
            onClick={() => handleAddToCart(product)}
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
