import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
};

export const getAllProducts = createAsyncThunk(
  "products/GETproducts",
  async () => {
    try {
      const response = await fetch("http://localhost:4040/products/all");

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
      });
  },
});

export const allProducts = (state) => state.productSlice.products;
export const isProductLoading = (state) => state.productSlice.isLoading;
export const errorProduct = (state) => state.productSlice.error;

export default allProductSlice.reducer;
