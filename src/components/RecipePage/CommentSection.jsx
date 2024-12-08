import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createReview,
  fetchReviewsByProduct,
  selectReviewsByProduct,
  selectReviewsLoading,
  selectReviewsError,
} from "../../reducer/reviewsSlice";
import { Star } from "lucide-react";
import useSession from "../../hooks/useSession";

const CommentsSection = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviewsByProduct);
  const reviewsLoading = useSelector(selectReviewsLoading);
  const reviewsError = useSelector(selectReviewsError);

  const session = useSession(); // Ottieni la sessione dell'utente loggato
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProduct(productId)); // Carica le recensioni iniziali
    }
  }, [productId, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!session?._id) {
      alert("Devi effettuare il login per lasciare un commento!");
      return;
    }

    if (comment.trim() && rating > 0) {
      const reviewData = {
        product: productId,
        comment,
        rating,
        user: session._id,
      };

      // Invia la recensione al backend
      dispatch(createReview(reviewData))
        .unwrap()
        .then((createdReview) => {
          // Dopo la creazione, aggiorna le recensioni
          dispatch(fetchReviewsByProduct(productId)); // Ricarica le recensioni per il prodotto
        })
        .catch((error) => {
          console.error("Errore durante la creazione del commento:", error);
        });

      setComment("");
      setRating(0);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="comments-section">
      <h2 className="mt-4 mb-3">Comments</h2>
      {reviewsLoading && <p>Loading comments...</p>}
      {reviewsError && <p className="text-danger">{reviewsError}</p>}
      {!reviewsLoading && reviews.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {/* Lista dei commenti */}
      <ul className="list-unstyled">
        {reviews.map((review) => (
          <li key={review._id} className="mb-3">
            <strong>{session?.name || "Anonymous"}</strong>{" "}
            {/* Usa session.name */}
            <div className="rating">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  color={index < review.rating ? "gold" : "lightgray"}
                />
              ))}
            </div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>

      {/* Form per aggiungere commento */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="rating mt-2">
          <label className="mr-2">Your Rating:</label>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={24}
              color={index < rating ? "gold" : "lightgray"}
              onClick={() => handleStarClick(index + 1)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-orange mt-3"
          disabled={!session?._id || !comment || rating === 0}
        >
          Post Comment
        </button>
        {!session?._id && (
          <p className="text-warning mt-2">
            Devi essere loggato per lasciare un commento.
          </p>
        )}
      </form>
    </div>
  );
};

export default CommentsSection;
