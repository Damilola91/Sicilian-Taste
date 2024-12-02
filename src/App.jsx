import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from "./components/Pages/HomePage/HomePage";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import RecipePage from "./components/RecipePage/RecipePage";
import SuccessLoginGoogle from "./components/SuccessLoginGoogle/SuccessLoginGoogle";
import ProtectedRoutes from "./middleware/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessLoginGoogle />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/recipe" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
