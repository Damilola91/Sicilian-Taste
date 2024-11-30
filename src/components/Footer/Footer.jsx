import "./Footer.css";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer d-flex">
      <div className="container">
        <div className="row p-3 align-items-center">
          <div className="col-lg-6 col-md-6">
            <h2 className="footer-logo">SicilianTaste</h2>
            <p className="footer-quote">
              "On the other hand,
              <br />
              we denounce with righteous
              <br />
              indignation and dislike men
              <br />
              who are so beguiled."
            </p>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6">
            <h5 className="footer-heading">SicilianTaste</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" className="footer-link">
                  About us
                </a>
              </li>
              <li>
                <a href="#careers" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#feedback" className="footer-link">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6">
            <h5 className="footer-heading">Legal</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#terms" className="footer-link">
                  Terms
                </a>
              </li>
              <li>
                <a href="#conditions" className="footer-link">
                  Conditions
                </a>
              </li>
              <li>
                <a href="#cookies" className="footer-link">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#copyright" className="footer-link">
                  Copyright
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6">
            <h5 className="footer-heading">Follow</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#facebook" className="footer-link">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#twitter" className="footer-link">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#instagram" className="footer-link">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#youtube" className="footer-link">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 text-start">
            <p className="footer-copyright">
              &copy; 2024 SicilianTaste - All rights reserved
            </p>
          </div>
          <div className="col-lg-6 col-md-6 text-end">
            <div className="footer-icons">
              <a href="#facebook" className="icon-link">
                <Facebook size={24} />
              </a>
              <a href="#twitter" className="icon-link">
                <Twitter size={24} />
              </a>
              <a href="#instagram" className="icon-link">
                <Instagram size={24} />
              </a>
              <a href="#youtube" className="icon-link">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
