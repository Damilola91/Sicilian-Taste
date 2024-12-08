import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}/reviews`;

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`);
      if (!response.ok) {
        throw new Error("Errore durante il recupero delle recensioni");
      }
      const data = await response.json();
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${productId}`);
      if (!response.ok) {
        throw new Error(
          "Errore durante il recupero delle recensioni per il prodotto"
        );
      }
      const data = await response.json();
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error("Errore durante la creazione della recensione");
      }
      const data = await response.json();
      return data.savedReview;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${reviewId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione della recensione");
      }
      const data = await response.json();
      return data.review;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState: {
    reviews: [],
    reviewsByProduct: [],
    createdReview: null,
    deletedReview: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsByProduct = action.payload;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.createdReview = action.payload;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedReview = action.payload;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload._id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectReviews = (state) => state.reviewsSlice.reviews;
export const selectReviewsByProduct = (state) =>
  state.reviewsSlice.reviewsByProduct;
export const selectCreatedReview = (state) => state.reviewsSlice.createdReview;
export const selectDeletedReview = (state) => state.reviewsSlice.deletedReview;
export const selectReviewsLoading = (state) => state.reviewsSlice.loading;
export const selectReviewsError = (state) => state.reviewsSlice.error;

export default reviewsSlice.reducer;
