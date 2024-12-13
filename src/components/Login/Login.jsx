import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./Login.css";
import { login, logout } from "../../reducer/authSlice";

const Login = ({ closeDrawer, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      dispatch(login({ role: JSON.parse(token)?.role }));
    }
  }, [dispatch]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return Swal.fire({
        icon: "error",
        title: "Errore",
        text: "Inserisci email e password",
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      });
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("Authorization", JSON.stringify(result.token));
        dispatch(login({ role: result.user.role }));

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Benvenuto su Sicilian Taste, ${result.user.name}!`,
            customClass: { popup: "swal-popup" },
            zIndex: 999999,
          }).then(() => {
            closeDrawer();
            navigate("/");
          });
        }, 200);
      } else {
        Swal.fire({
          icon: "error",
          title: "Errore di Login",
          text: result.message || "Credenziali non valide",
          customClass: { popup: "swal-popup" },
          zIndex: 999999,
        });
      }
    } catch (error) {
      console.error("Errore di login:", error);
      Swal.fire({
        icon: "error",
        title: "Errore di rete",
        text: "Si è verificato un errore durante il login. Riprova più tardi.",
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/logout`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        localStorage.removeItem("Authorization");
        dispatch(logout());

        Swal.fire({
          icon: "success",
          title: "Logout eseguito con successo",
          customClass: { popup: "swal-popup" },
          zIndex: 999999,
        });

        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Errore di Logout",
          text: "Non è stato possibile effettuare il logout. Riprova più tardi.",
          customClass: { popup: "swal-popup" },
          zIndex: 999999,
        });
      }
    } catch (error) {
      console.error("Errore di logout:", error);
      Swal.fire({
        icon: "error",
        title: "Errore di rete",
        text: "Si è verificato un errore durante il logout. Riprova più tardi.",
        customClass: { popup: "swal-popup" },
        zIndex: 999999,
      });
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      {!isAuthenticated ? (
        <>
          <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInput}
                required
              />
              <a href="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Caricamento..." : "Login"}
            </button>
          </form>
          <p className="or-login-with">Or login with</p>
          <div className="social-buttons">
            <button className="google-button" onClick={redirectToGoogle}>
              Google
            </button>
          </div>
          <p className="signup-prompt">
            Don’t have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/register")}>
              Sign up
            </span>
          </p>
        </>
      ) : (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
