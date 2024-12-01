import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import RecipePage from "./components/Pages/RecipePage/RecipePage";
import PopularCategories from "./components/PopularCategories/PopularCategories";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
