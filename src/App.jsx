import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from "./components/Pages/HomePage/HomePage";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import RecipePage from "./components/RecipePage/RecipePage";
import SuccessLoginGoogle from "./components/SuccessLoginGoogle/SuccessLoginGoogle";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import CategoryProducts from "./components/Pages/CategoryProducts/CategoryProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessLoginGoogle />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<CategoryProducts />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/recipe" element={<RecipePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
