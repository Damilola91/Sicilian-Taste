import CreateProduct from "../CreateProduct/CreateProduct";
import Disclaimer from "../Disclaimer/Disclaimer";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ProductList from "../ProductList/ProductList";
import SendNewsletter from "../SendNewsLetter/SendNewsLetter";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <ProductList />
      <SendNewsletter />
      <CreateProduct />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default AdminPage;
