import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../assets/img/planet-cat-logo.png';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header">
      <div className="header-container container">
        <div className="logo">
          <img src={logoImage} alt="Planet Cat Logo" />
          <span className="logo-text">Planet Cat</span>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuActive ? '✖' : '☰'}
        </div>

        <nav>
          <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link active">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/gif-cat" className="nav-link">Gifs de chats</Link>
            </li>
            <li className="nav-item">
              <Link to="/image-cat" className="nav-link">Images de chats</Link>
            </li>
            <li className="nav-item">
              <Link to="/meme-cat" className="nav-link">Meme de chats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
