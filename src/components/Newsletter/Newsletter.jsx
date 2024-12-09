const Newsletter = () => {
  return (
    <section className="text-center newsletter-section mt-5">
      <h3>Deliciousness to your inbox</h3>
      <p>Enjoy weekly hand-picked recipes and recommendations</p>
      <form className="d-flex justify-content-center gap-2 mt-4">
        <input
          type="email"
          placeholder="Your Email Address"
          className="form-control w-50"
        />
        <button type="submit" className="btn">
          Join
        </button>
      </form>
      <small className="d-block mt-3">
        By joining, you agree to our terms and conditions.
      </small>
    </section>
  );
};

export default Newsletter;
