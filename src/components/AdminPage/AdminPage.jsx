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
      <Footer />
    </>
  );
};

export default AdminPage;
