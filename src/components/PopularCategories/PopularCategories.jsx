import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../reducer/productSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopularCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const categoriesToShow = categories.slice(0, 6);

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <section className="text-center mb-5 popular-categories">
      <h2>Popular Categories</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!isLoading && !error && categoriesToShow.length > 0 ? (
        <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
          {categoriesToShow.map((category, index) => {
            const productForCategory = products.find(
              (product) => product.category === category
            );
            return (
              <div
                key={index}
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleCategoryClick(category)}
              >
                {productForCategory && productForCategory.img ? (
                  <img
                    src={productForCategory.img}
                    alt={category}
                    className="rounded-circle mb-2"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#ddd",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
                <p>{category}</p>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading &&
        categoriesToShow.length === 0 && <p>No categories available.</p>
      )}
    </section>
  );
};

export default PopularCategories;
