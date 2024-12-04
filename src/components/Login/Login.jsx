import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
        setIsAuthenticated(true);

        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: `Benvenuto su Sicilian Taste, ${result.user.name}!`,
            customClass: { popup: "swal-popup" },
            zIndex: 999999,
          });
          navigate("/");
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
        setIsAuthenticated(false);

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
            <button className="facebook-button">
              <i className="fab fa-facebook"></i> Facebook
            </button>
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
