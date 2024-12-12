import { useState } from "react";
import "./ContactPage.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    text: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Email inviata con successo!");
        setFormData({ from: "", subject: "", text: "" });
      } else {
        setMessage(`Errore: ${result.message || "Qualcosa è andato storto"}`);
      }
    } catch (error) {
      setMessage("Errore durante l'invio dell'email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page my-3">
        <h1 className="contact-page-title">Contattaci</h1>
        <div className="contact-form">
          <label htmlFor="from">Da:</label>
          <input
            type="email"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Oggetto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="text">Testo:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="5"
            required
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Invio in corso..." : "Invia"}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
