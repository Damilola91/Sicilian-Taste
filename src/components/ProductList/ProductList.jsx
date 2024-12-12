import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import {
  getPaginatedProducts,
  updateProduct,
  deleteProduct,
  paginatedProducts,
  isProductLoading,
  errorProduct,
  paginatedTotalPages,
  currentPage,
} from "../../reducer/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(paginatedProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);
  const totalPages = useSelector(paginatedTotalPages);
  const currentPageNumber = useSelector(currentPage);

  useEffect(() => {
    dispatch(getPaginatedProducts({ page: currentPageNumber, pageSize: 8 }));
  }, [dispatch, currentPageNumber]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdate = (productId, updateData) => {
    dispatch(updateProduct({ productId, updateData }));
  };

  const handlePageChange = (page) => {
    dispatch(getPaginatedProducts({ page }));
  };

  return (
    <div className="my-3">
      <h1 className="text-center">Product List</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <>
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price.$numberDecimal}</p>
                <button
                  className="product-update"
                  onClick={() =>
                    handleUpdate(product._id, { name: "New Name" })
                  }
                >
                  Update
                </button>
                <button
                  className="product-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="product-pagination">
            <button
              onClick={() => handlePageChange(currentPageNumber - 1)}
              disabled={currentPageNumber <= 1}
            >
              Prev
            </button>
            <span>{currentPageNumber}</span>
            <button
              onClick={() => handlePageChange(currentPageNumber + 1)}
              disabled={currentPageNumber >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
