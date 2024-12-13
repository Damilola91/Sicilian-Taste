import HomePage from "../components/Pages/HomePage/HomePage";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

export const isAuth = () => {
  return localStorage.getItem("Authorization");
};

const ProtectedRoutes = () => {
  const isAuthorized = isAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthorized) {
    try {
      const payloadBase64 = isAuthorized.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));

      if (location.pathname.startsWith("/admin") && payload.role !== "admin") {
        return <NotFoundPage />;
      }

      return <Outlet />;
    } catch (error) {
      console.error("Errore nella decodifica del token:", error);
      navigate("/");
      return null;
    }
  }

  return <HomePage />;
};

export default ProtectedRoutes;
