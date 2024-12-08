import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuth } from "../middleware/ProtectedRoutes";
import { isTokenExpired } from "../utils/verifyTokenExpiration";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = isAuth();
    if (session) {
      try {
        const decodedSession = jwtDecode(session);
        console.log("Decoded session:", decodedSession);

        if (isTokenExpired(decodedSession.exp)) {
          setSessionData(null);
          navigate("/");
        } else {
          setSessionData({
            token: session,
            ...decodedSession,
          });
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
        navigate("/");
      }
    } else {
      setSessionData(null);
      navigate("/");
    }
  }, [navigate]);

  return sessionData;
};

export default useSession;
