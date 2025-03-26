import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">Planet Cat</h3>
            <p>Le monde des chats fun !</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Liens Rapides</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/gif-cat">Gifs de chats</Link>
              </li>
              <li>
                <Link to="/image-cat">Images de chats</Link>
              </li>
              <li>
                <Link to="/meme-cat">Meme de chats</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contactez-nous</h3>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>123 Rue des Chats Droles, CatVille</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>01 02 03 04 05</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>contact@planetcat.fr</span>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p>Recevez nos actualités et astuces sur les chats directement dans votre boîte mail.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Votre email" 
                required 
              />
              <button type="submit" className="newsletter-btn">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © {new Date().getFullYear()} Planet Cat. Tous droits réservés 
            <span className="paw-icon">🐾</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
