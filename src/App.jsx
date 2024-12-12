import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from "./components/Pages/HomePage/HomePage";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import RecipePage from "./components/RecipePage/RecipePage";
import SuccessLoginGoogle from "./components/SuccessLoginGoogle/SuccessLoginGoogle";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import WrappedOrderForm from "./components/WrappedOrderForm/WrappedOrderForm";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ContactPage from "./components/Pages/ContactPage/ContactPage";
import SendNewsletter from "./components/SendNewsLetter/SendNewsLetter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/success" element={<SuccessLoginGoogle />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<CategoryProducts />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipe/:_id" element={<RecipePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/newsletter" element={<SendNewsletter />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/buy" element={<WrappedOrderForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
