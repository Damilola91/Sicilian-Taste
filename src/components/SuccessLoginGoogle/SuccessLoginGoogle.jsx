import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessLoginGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("Authorization", JSON.stringify(token));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Login Effettuato Con Successo</h1>
    </div>
  );
};

export default SuccessLoginGoogle;
