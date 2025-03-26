import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/img/planet-cat-logo.png';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  // Fermer le menu lorsque la taille de l'écran change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuActive) {
        setMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuActive]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Fonction pour faire défiler vers le haut et fermer le menu si ouvert
  const handleNavClick = () => {
    window.scrollTo(0, 0);
    if (menuActive) {
      setMenuActive(false);
    }
  };

  return (
    <header className="header">
      <div className="header-container container">
        <Link to="/" className="logo-link" onClick={handleNavClick}>
          <div className="logo">
            <img src={logoImage} alt="Planet Cat Logo" />
            <span className="logo-text">Planet Cat</span>
          </div>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuActive ? '✖' : '☰'}
        </div>

        <nav className={menuActive ? 'mobile-nav-active' : ''}>
          <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link active" onClick={handleNavClick}>Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/gif-cat" className="nav-link" onClick={handleNavClick}>Gifs de chats</Link>
            </li>
            <li className="nav-item">
              <Link to="/image-cat" className="nav-link" onClick={handleNavClick}>Images de chats</Link>
            </li>
            <li className="nav-item">
              <Link to="/meme-cat" className="nav-link" onClick={handleNavClick}>Meme de chats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
