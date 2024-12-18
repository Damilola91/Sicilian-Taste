import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="text-center newsletter-section mt-5">
      <h3>Deliciousness to your inbox</h3>
      <p>Enjoy weekly hand-picked recipes and recommendations</p>
      <form
        className="d-flex justify-content-center gap-2 mt-4"
        onSubmit={handleSubscribe}
      >
        <input
          type="email"
          placeholder="Your Email Address"
          className="form-control w-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Join
        </button>
      </form>
      {message && <small className="d-block mt-3">{message}</small>}
    </section>
  );
};

export default NewsLetter;
