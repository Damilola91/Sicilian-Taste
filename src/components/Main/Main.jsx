import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicious/SuperDelicious";

import "./Main.css";
import Newsletter from "../Pages/Newsletter/Newsletter";

const Main = () => {
  const searchResults = useSelector(
    (state) => state.productSlice.searchProductsByName
  );
  const searchError = useSelector(
    (state) => state.productSlice.searchProductsError
  );

  return (
    <main className="container my-5">
      {searchResults && searchResults.length > 0 ? (
        <div className="search-results row">
          {searchResults.map((product) => (
            <div className="col-md-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        searchResults.length === 0 && <p>{searchError}</p>
      )}
      <PopularCategories />
      <SuperDelicious />
      <Newsletter />
    </main>
  );
};

export default Main;
