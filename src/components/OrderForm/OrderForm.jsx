import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../../reducer/cartSlice";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import "./OrderForm.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const OrderForm = ({ cartItems }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      setOrderMessage("Compila tutti i campi dello shipping address.");
      return;
    }
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) {
      console.error("Stripe o Elements non inizializzati");
      return;
    }

    setIsSubmitting(true);
    setOrderMessage("Elaborazione...");

    const orderData = {
      user: session?._id || null,
      items: cartItems.map((item) => ({
        products: [
          {
            product: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price.toString()),
          },
        ],
        subTotal: (parseFloat(item.price) * item.quantity).toFixed(2),
      })),
      shippingAddress,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella creazione dell'ordine.");
      }

      const { clientSecret } = await response.json();
      console.log("Client Secret ricevuto:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Pagamento effettuato con successo!");
        dispatch(clearCart());
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Errore:", error);
      setOrderMessage(`Errore: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <Navbar />
      <div className="orderFormBody my-3">
        <h1>Carrello</h1>

        {cartItems.length > 0 ? (
          <>
            <h2>Articoli nel Carrello</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="cartItem">
                <div className="cartItemDetails">
                  <h4>{item.name}</h4>
                  <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                  <div className="quantityControls">
                    <button
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      disabled={item.quantity <= 1}
                      className="decrementButton"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      className="incrementButton"
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Prezzo totale: €
                    {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="removeButton"
                    aria-label="Rimuovi elemento"
                  >
                    <Trash2 size="24" color="#ff4d4f" />
                  </button>
                </div>
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="cartItemImage"
                  />
                )}
              </div>
            ))}

            {!isConfirmed ? (
              <>
                <h3>Inserisci il tuo indirizzo di spedizione</h3>
                <form className="shippingForm">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nome completo"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Via"
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Città"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="CAP"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Paese"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                  />
                </form>
                <button onClick={handleConfirmOrder} className="button">
                  Conferma Ordine (€{cartTotal})
                </button>
              </>
            ) : (
              <>
                <h3>Pagamento</h3>
                <CardElement className="cardElement" />
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="button"
                >
                  {isSubmitting ? "Elaborazione..." : "Effettua Pagamento"}
                </button>
              </>
            )}
          </>
        ) : (
          <p>Il carrello è vuoto!</p>
        )}

        {orderMessage && <p className="statusMessage">{orderMessage}</p>}
      </div>
      <Footer />
    </>
  );
};

export default OrderForm;
