import { useNavigate } from "react-router-dom";
import { isAuth } from "../middleware/ProtectedRoutes";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { isTokenExpired } from "../utilis/verifyTokenExpiration";

const useSession = () => {
  const session = isAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!session || isTokenExpired(decodedSession.exp, () => navigate("/"))) {
      navigateToHome();
    }
  }, [navigate, session]);
};

export default useSession;
