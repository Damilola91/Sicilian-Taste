import "./Navbar.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Login from "../Login/Login";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
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
                <a className="nav-link" href="/">
                  Homepage
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
                Login
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
          <Login closeDrawer={closeDrawer} />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
