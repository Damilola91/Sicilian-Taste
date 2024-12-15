import { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { searchProductsByName } from "../../reducer/productSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearchInput = () => setIsInputVisible(!isInputVisible);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchProductsByName(searchQuery));
    }
  };

  return (
    <div className="search-container d-flex align-items-center">
      <button
        onClick={toggleSearchInput}
        className="search-icon-button"
        aria-label="Search"
      >
        <Search size={24} />
      </button>

      {isInputVisible && (
        <form
          onSubmit={handleSearchSubmit}
          className="d-flex align-items-center"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Cerca prodotti..."
          />
        </form>
      )}
    </div>
  );
};

export default SearchInput;
