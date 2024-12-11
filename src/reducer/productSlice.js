import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  error: "",
  paginatedProducts: [],
  paginatedTotalPages: 0,
  categorySearchProducts: [],
  categorySearchError: "",
  categoryTotalProducts: 0,
  categoryTotalPages: 0,
};

export const getAllProducts = createAsyncThunk(
  "products/GETproducts",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/all`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw new Error("Couldn't Retrieve Products");
    }
  }
);

export const getPaginatedProducts = createAsyncThunk(
  "products/GETpaginatedProducts",
  async ({ page = 1, pageSize = 8 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/products?page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch paginated products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching paginated products:", error.message);
      return rejectWithValue("Couldn't retrieve paginated products");
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/GETproductsByCategory",
  async ({ category, page = 1, pageSize = 6 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/products/search/${category}?page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products by category");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products by category:", error.message);
      return rejectWithValue("Couldn't retrieve products by category");
    }
  }
);

const allProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Couldn't retrieve products";
      })

      .addCase(getPaginatedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getPaginatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paginatedProducts = action.payload.products || [];
        state.totalProducts = action.payload.count || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.meta.arg.page || 1;
        state.paginatedTotalPages = action.payload.totalPages || 0;
      })
      .addCase(getPaginatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Couldn't retrieve paginated products";
      })

      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.categorySearchError = "";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categorySearchProducts = action.payload.products || [];
        state.categoryTotalProducts = action.payload.count || 0;
        state.categoryTotalPages = action.payload.totalPages || 0;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.categorySearchError =
          action.payload || "Couldn't retrieve products by category";
      });
  },
});

export const allProducts = (state) => state.productSlice.products;
export const isProductLoading = (state) => state.productSlice.isLoading;
export const errorProduct = (state) => state.productSlice.error;
export const paginatedProducts = (state) =>
  state.productSlice.paginatedProducts;
export const totalProducts = (state) => state.productSlice.totalProducts;
export const totalPages = (state) => state.productSlice.totalPages;
export const currentPage = (state) => state.productSlice.currentPage;
export const paginatedTotalPages = (state) =>
  state.productSlice.paginatedTotalPages;

export const categorySearchProducts = (state) =>
  state.productSlice.categorySearchProducts;
export const categorySearchError = (state) =>
  state.productSlice.categorySearchError;
export const categoryTotalProducts = (state) =>
  state.productSlice.categoryTotalProducts;
export const categoryTotalPages = (state) =>
  state.productSlice.categoryTotalPages;

export default allProductSlice.reducer;
