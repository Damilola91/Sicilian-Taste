import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../../reducer/cartSlice";
import { createReview } from "../../reducer/reviewsSlice";
import { Star, StarHalf } from "lucide-react";
import useSession from "../../hooks/useSession";
import { selectReviewsByProduct } from "../../reducer/reviewsSlice";

const SuperDelicious = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);
  const reviewsByProduct = useSelector(selectReviewsByProduct);
  const session = useSession();

  const [selectedRating, setSelectedRating] = useState({});
  const [randomProducts, setRandomProducts] = useState([]);

  // Funzione per ottenere i prodotti casuali una sola volta
  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setRandomProducts(shuffled.slice(0, 6));
  }, [products]); // Esso verrà eseguito solo una volta quando `products` cambia

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

    // Crea una nuova recensione con il rating
    const reviewData = {
      rating,
      user: session._id,
      product: productId,
    };

    // Dispatch dell'azione createReview per inviare la recensione
    dispatch(createReview(reviewData));

    // Imposta il rating selezionato (per colorare le stelle correttamente)
    setSelectedRating((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  // Funzione per ottenere il rating medio di un prodotto
  const getProductRating = (productId) => {
    const reviews = reviewsByProduct[productId] || [];
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        : 0;
    return averageRating;
  };

  return (
    <section>
      <h2 className="text-center mb-4">Super Delicious</h2>
      <div className="row g-4">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => {
            const productRating = getProductRating(product._id);
            const userRating = selectedRating[product._id] || productRating; // Usa il rating appena inviato o quello esistente

            return (
              <div key={product._id} className="col-md-4">
                <div className="card h-100">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex align-items-center">
                      <strong>Rating:</strong>
                      <div className="ms-2">
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
                    <p className="card-text">
                      <strong>Price:</strong> €
                      {parseFloat(
                        product.price.$numberDecimal.toString()
                      ).toFixed(2)}
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
          })
        ) : (
          <p>Non ci sono prodotti disponibili.</p>
        )}
      </div>
    </section>
  );
};

export default SuperDelicious;
