import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Login from "../Login/Login";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato di autenticazione
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Setta lo stato di autenticazione a true dopo il login
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Setta lo stato di autenticazione a false dopo il logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand logo" href="/">
            SicilianTaste
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/create">
                  Crea Prodotto
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/recipe">
                  Recipe Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categories">
                  Category
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/buy">
                  Buy
                </a>
              </li>
            </ul>
            <div className="nav-icons d-flex align-items-center">
              <span className="search-icon">&#128269;</span>
              <button onClick={toggleDrawer} className="login-button ms-3">
                {isAuthenticated ? "Logout" : "Login"}{" "}
                {/* Cambia il testo in base allo stato di autenticazione */}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="drawer"
        style={{
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        size={350}
      >
        <div className="drawer-content">
          <Login
            closeDrawer={closeDrawer}
            onLogin={handleLogin} // Passa la funzione per gestire il login
            onLogout={handleLogout} // Passa la funzione per gestire il logout
            isAuthenticated={isAuthenticated} // Passa lo stato di autenticazione
          />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
