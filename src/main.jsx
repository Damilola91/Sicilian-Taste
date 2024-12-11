import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./reducer/productSlice.js";
import cartReducer from "./reducer/cartSlice.js";
import reviewsReducer from "./reducer/reviewsSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import "./index.css";
import App from "./App.jsx";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const reducer = combineReducers({
  productSlice: productReducer,
  cartSlice: persistReducer(cartPersistConfig, cartReducer),
  reviewsSlice: reviewsReducer,
});

// Crea il Redux store
const store = configureStore({
  reducer,
});

// Configura persistor
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

export { store, persistor };
