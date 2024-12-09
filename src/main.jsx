import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./reducer/productSlice.js";
import cartReducer from "./reducer/cartSlice.js";
import reviewsReducer from "./reducer/reviewsSlice.js";
import { persistStore, persistReducer } from "redux-persist"; // Importa da redux-persist
import storage from "redux-persist/lib/storage"; // Usa localStorage o sessionStorage
import "./index.css";
import App from "./App.jsx";

// Configurazione persist per il cartReducer
const cartPersistConfig = {
  key: "cart", // Chiave che userai per identificare lo stato persistente
  storage, // Salva lo stato in localStorage
};

const reducer = combineReducers({
  productSlice: productReducer,
  cartSlice: persistReducer(cartPersistConfig, cartReducer), // Persisti solo cartSlice
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

export { store, persistor }; // Puoi esportarlo per usarlo nel PersistGate
