import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";

const App = () => {
  return (
    <>
      <Navbar />
      <CategoriesPage />
      <Footer />
    </>
  );
};

export default App;
