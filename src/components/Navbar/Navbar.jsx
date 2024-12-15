import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Login from "../Login/Login";
import "./Navbar.css";
import useSession from "../../hooks/useSession";
import {
  login,
  logout,
  selectIsAuthenticated,
  selectRole,
} from "../../reducer/authSlice";
import SearchInput from "../SearchInput/SearchInput";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const sessionData = useSession();
  const location = useLocation();

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    if (sessionData && sessionData.token) {
      dispatch(login({ role: sessionData.role }));
    } else {
      dispatch(logout());
    }
  }, [sessionData, dispatch]);

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
              {role === "admin" && isAuthenticated && (
                <li className="nav-item">
                  <a className="nav-link" href="/admin">
                    Admin
                  </a>
                </li>
              )}
            </ul>
            <div className="nav-icons d-flex align-items-center">
              {location.pathname === "/" && <SearchInput />}
              <button onClick={toggleDrawer} className="login-button ms-3">
                {isAuthenticated ? "Logout" : "Login"}
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
            onLogin={() => dispatch(login({ role: sessionData.role }))}
            onLogout={() => dispatch(logout())}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
