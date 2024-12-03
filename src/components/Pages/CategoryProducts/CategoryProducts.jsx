import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../../reducer/productSlice";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <Navbar />
      <div className="category-products container my-5">
        <h2 className="text-center mb-4">Products in "{category}"</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && filteredProducts.length > 0 ? (
          <div className="row gy-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
              >
                <div className="product-item">
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
          <p>No products available in this category.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
