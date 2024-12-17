import { useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const sessionData = useSession();
  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("file", fileToUpload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/upload/cloud`,
        {
          method: "POST",
          body: fileData,
        }
      );
      if (!response.ok) {
        throw new Error("Errore durante l'upload dell'immagine");
      }
      const data = await response.json();
      return data.file.url;
    } catch (error) {
      console.error("Errore durante l'upload dell'immagine:", error.message);
      throw error;
    }
  };

  const createProduct = async (formData, file) => {
    if (!file) {
      console.error("Nessun file selezionato.");
      return;
    }

    if (!sessionData) {
      console.error("Non sei autenticato.");
      navigate("/");
      return;
    }

    try {
      const uploadedImageUrl = await uploadFile(file);
      const postFormData = {
        ...formData,
        img: uploadedImageUrl,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la creazione del prodotto");
      }

      const createdProduct = await response.json();
      setProduct(createdProduct.product);
    } catch (error) {
      console.error("Errore durante la creazione del prodotto:", error.message);
    }
  };

  return (
    <>
      <div className="create-product-container">
        <h1>Crea un Nuovo Prodotto</h1>
        <div className="form-and-preview">
          <div className="form-container">
            <ProductForm onCreateProduct={createProduct} />
          </div>
          <div className="preview-container">
            {product && <ProductPreview product={product} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
