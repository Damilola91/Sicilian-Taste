import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./reducer/productSlice.js";
import "./index.css";
import App from "./App.jsx";

const reducer = combineReducers({
  productSlice: productReducer,
});

const store = configureStore({ reducer });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
