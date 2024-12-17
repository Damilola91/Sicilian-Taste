import "./ProductPreview.css";

const ProductPreview = ({ product }) => {
  return (
    <div className="product-preview">
      <div className="card shadow-sm">
        <img src={product.img} alt="Product" className="card-img" />
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text">
            <strong>Descrizione:</strong> {product.description}
          </p>
          <p className="card-text">
            <strong>Prezzo:</strong> {product.price.$numberDecimal} €
          </p>
          <p className="card-text">
            <strong>Categoria:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>Ingredienti:</strong> {product.ingredients.join(", ")}
          </p>
          <p className="card-text">
            <strong>Ricetta:</strong> {product.recipe}
          </p>
          <h4>Fatti Nutrizionali</h4>
          <ul>
            <li>Calorie: {product.nutritionFacts.calories}</li>
            <li>Carboidrati: {product.nutritionFacts.carbs}</li>
            <li>Grassi: {product.nutritionFacts.fat}</li>
            <li>Proteine: {product.nutritionFacts.protein}</li>
            <li>Zuccheri: {product.nutritionFacts.sugar}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
