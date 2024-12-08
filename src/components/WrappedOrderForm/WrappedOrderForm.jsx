import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../../reducer/cartSlice";
import OrderForm from "../OrderForm/OrderForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

const WrappedOrderForm = () => {
  const cartItems = useSelector(selectCartItems); // Selettore per i prodotti nel carrello
  const totalAmount = useSelector(selectTotalAmount); // Selettore per il totale

  console.log("Dati carrello in WrappedOrderForm:", cartItems); // Log per verificare i dati

  return (
    <Elements stripe={stripePromise}>
      <OrderForm cartItems={cartItems} totalAmount={totalAmount} />
    </Elements>
  );
};

export default WrappedOrderForm;
