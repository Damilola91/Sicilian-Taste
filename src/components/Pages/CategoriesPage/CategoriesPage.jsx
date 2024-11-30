import "./CategoriesPage.css";

const CategoriesPage = () => {
  const categories = [
    { name: "Seafood", image: "https://via.placeholder.com/150?text=Seafood" },
    { name: "Soup", image: "https://via.placeholder.com/150?text=Soup" },
    {
      name: "Pancakes",
      image: "https://via.placeholder.com/150?text=Pancakes",
    },
    { name: "Meat", image: "https://via.placeholder.com/150?text=Meat" },
    { name: "Chicken", image: "https://via.placeholder.com/150?text=Chicken" },
    { name: "Pasta", image: "https://via.placeholder.com/150?text=Pasta" },
    { name: "Pizza", image: "https://via.placeholder.com/150?text=Pizza" },
    { name: "Burger", image: "https://via.placeholder.com/150?text=Burger" },
    {
      name: "Desserts",
      image: "https://via.placeholder.com/150?text=Desserts",
    },
    {
      name: "Smoothies",
      image: "https://via.placeholder.com/150?text=Smoothies",
    },
    {
      name: "Breakfast",
      image: "https://via.placeholder.com/150?text=Breakfast",
    },
    { name: "Salad", image: "https://via.placeholder.com/150?text=Salad" },
  ];

  return (
    <div className="categories-page container my-5">
      <h2 className="text-center mb-4">Categories</h2>
      <div className="row justify-content-center gy-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
          >
            <div className="category-item">
              <img
                src={category.image}
                alt={category.name}
                className="rounded-circle img-fluid category-image"
              />
              <p className="category-name mt-1">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
