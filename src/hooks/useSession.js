import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuth } from "../middleware/ProtectedRoutes";
import { isTokenExpired } from "../utils/verifyTokenExpiration";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isRecipePage = location.pathname === "/recipe";

  useEffect(() => {
    const session = isAuth();

    try {
      const decodedSession = session ? jwtDecode(session) : null;

      if (isTokenExpired(decodedSession?.exp) && !isRecipePage) {
        setSessionData(null);
        navigate("/");
      } else {
        const updatedSession = {
          token: session,
          role: decodedSession?.role || null,
          ...decodedSession,
        };
        setSessionData(updatedSession);
      }
    } catch (error) {
      console.error("Errore nel decoding del token:", error);
      setSessionData(null);
    }
  }, [navigate, location.pathname]);

  return sessionData;
};

export default useSession;
