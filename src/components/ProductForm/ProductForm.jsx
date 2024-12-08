import React, { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ onCreateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
    recipe: "",
    availableInStock: "",
    calories: "",
    carbs: "",
    fat: "",
    protein: "",
    sugar: "",
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      nutritionFacts: {
        calories: formData.calories || 0,
        carbs: formData.carbs || 0,
        fat: formData.fat || 0,
        protein: formData.protein || 0,
        sugar: formData.sugar || 0,
      },
    };
    await onCreateProduct(productData, file); // Passa i dati al parent
  };

  return (
    <div className="product-form-container">
      <h2>Crea un Prodotto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Descrizione</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="price">Prezzo</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleziona una categoria</option>
          <option value="dolci">Dolci</option>
          <option value="conserve">Conserve</option>
          <option value="vini">Vini</option>
          <option value="olio">Olio</option>
          <option value="primi piatti">Primi Piatti</option>
          <option value="secondi piatti">Secondi Piatti</option>
          <option value="street food">Street Food</option>
          <option value="contorni">Contorni</option>
          <option value="antipasti">Antipasti</option>
          <option value="salumi">Salumi</option>
          <option value="formaggi">Formaggi</option>
        </select>

        <label htmlFor="ingredients">Ingredienti (separati da virgola)</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="recipe">Ricetta</label>
        <textarea
          id="recipe"
          name="recipe"
          value={formData.recipe}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="availableInStock">Disponibile in magazzino</label>
        <input
          type="number"
          id="availableInStock"
          name="availableInStock"
          value={formData.availableInStock}
          onChange={handleInputChange}
          step="1"
        />

        <h3>Fatti Nutrizionali</h3>
        <label htmlFor="calories">Calorie</label>
        <input
          type="text"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="carbs">Carboidrati</label>
        <input
          type="text"
          id="carbs"
          name="carbs"
          value={formData.carbs}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="fat">Grassi</label>
        <input
          type="text"
          id="fat"
          name="fat"
          value={formData.fat}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="protein">Proteine</label>
        <input
          type="text"
          id="protein"
          name="protein"
          value={formData.protein}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="sugar">Zuccheri</label>
        <input
          type="text"
          id="sugar"
          name="sugar"
          value={formData.sugar}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="file">Carica un'immagine</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Crea Prodotto</button>
      </form>
    </div>
  );
};

export default ProductForm;
