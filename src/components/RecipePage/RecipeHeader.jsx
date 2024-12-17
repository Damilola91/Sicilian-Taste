const RecipeHeader = ({ name, img, description }) => {
  return (
    <header className="text-center mb-4">
      <h1 className="mb-3" style={{ fontFamily: "'Brush Script MT', cursive" }}>
        {name}
      </h1>
      <img
        src={img}
        alt={name}
        className="img-fluid rounded mb-3"
        style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
      />
      <p className="lead">{description}</p>
    </header>
  );
};

export default RecipeHeader;
