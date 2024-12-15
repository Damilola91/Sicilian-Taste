import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicious/SuperDelicious";
import Newsletter from "../NewsLetter/NewsLetter";

import "./Main.css";

const Main = () => {
  const searchResults = useSelector(
    (state) => state.productSlice.searchProductsByName
  );
  const searchError = useSelector(
    (state) => state.productSlice.searchProductsError
  );

  return (
    <main className="container my-5">
      <div className="search-results">
        {searchResults && searchResults.length > 0 ? (
          <div className="row">
            {searchResults.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p>{searchError}</p>
        )}
      </div>
      <PopularCategories />
      <SuperDelicious />
      <Newsletter />
    </main>
  );
};

export default Main;
