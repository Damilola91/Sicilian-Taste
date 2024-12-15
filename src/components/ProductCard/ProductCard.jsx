/*const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img
        src={product.img} // Assicurati di gestire l'immagine in modo corretto
        alt={product.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>€{product.price.$numberDecimal}</strong>
        </p>
        <a href={`/recipe/${product._id}`} className="btn btn-primary">
          Dettagli
        </a>
      </div>
    </div>
  );
};

export default ProductCard;*/

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
import "../SuperDelicious/SuperDelicious.css";

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
    <div className="card">
      <div className="card-inner">
        <img
          src={product.img}
          alt={product.name}
          className="card-img-top"
          onClick={() => handleCardClick(product._id)}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <div className="card-price">
            <span>
              Price: €{parseFloat(product.price.$numberDecimal).toFixed(2)}
            </span>
          </div>
          <div className="card-rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < userRating ? "card-full-star selected" : "card-empty-star"
                }
                onClick={() => handleRating(product._id, i + 1)}
              >
                <Star />
              </span>
            ))}
          </div>
          <p className="card-stock">
            Available: {parseFloat(product.availableInStock.$numberDecimal)}
          </p>
          <button
            className="btn btn-primary"
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
