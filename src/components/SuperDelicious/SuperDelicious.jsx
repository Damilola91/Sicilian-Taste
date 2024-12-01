import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";

const SuperDelicious = () => {
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const getRandomProducts = (products) => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  };

  const randomProducts = getRandomProducts(products);

  return (
    <section>
      <h2 className="text-center mb-4">Super Delicious</h2>
      <div className="row g-4">
        {isLoading && <p>Loading...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!isLoading && !error && randomProducts.length > 0 ? (
          randomProducts.map((product, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>Rating:</strong> 4.5 ★
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </section>
  );
};

export default SuperDelicious;
