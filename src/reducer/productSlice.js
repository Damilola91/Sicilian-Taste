import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [], // Prodotti generali (non paginati)
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1, // Pagina corrente per la paginazione
  error: "",
  // Stato per la paginazione specifica di SuperDelicious
  paginatedProducts: [], // Prodotti per la paginazione (solo per SuperDelicious)
  paginatedTotalPages: 0,
};

// Thunk per ottenere tutti i prodotti
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

// Thunk per ottenere i prodotti paginati (solo per SuperDelicious)
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
        // Memorizza i prodotti per la paginazione separata per SuperDelicious
        state.paginatedProducts = action.payload.products || [];
        state.totalProducts = action.payload.count || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.meta.arg.page || 1;
        // Memorizza anche il numero di pagine per la paginazione specifica di SuperDelicious
        state.paginatedTotalPages = action.payload.totalPages || 0;
      })
      .addCase(getPaginatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Couldn't retrieve paginated products";
      });
  },
});

// Gli export che hai chiesto di mantenere invariati
export const allProducts = (state) => state.productSlice.products;
export const isProductLoading = (state) => state.productSlice.isLoading;
export const errorProduct = (state) => state.productSlice.error;
export const paginatedProducts = (state) =>
  state.productSlice.paginatedProducts; // Solo per SuperDelicious
export const totalProducts = (state) => state.productSlice.totalProducts;
export const totalPages = (state) => state.productSlice.totalPages;
export const currentPage = (state) => state.productSlice.currentPage;
export const paginatedTotalPages = (state) =>
  state.productSlice.paginatedTotalPages; // Solo per SuperDelicious

export default allProductSlice.reducer;
