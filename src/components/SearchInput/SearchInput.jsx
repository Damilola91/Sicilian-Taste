import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsByName } from "../../reducer/productSlice";
import "./SearchInput.css";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchProductsByName(searchQuery.trim() || ""));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    dispatch(searchProductsByName(""));
  };

  return (
    <div className="search-input-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search Product"
        />

        <button
          type="button"
          onClick={handleClearSearch}
          className="clear-button"
          aria-label="Clear search"
        >
          &#x2715;
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
