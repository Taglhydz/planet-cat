import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import imageCat from '../../assets/img/intro-cat.png';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Section Intro */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h1>Bienvenue sur Planet Cat</h1>
            <p>Le meilleur endroit pour découvrir des chats mignons, drôles et adorables</p>
          </div>
          <div className="intro-image">
            <img src={imageCat} alt="Chat mignon" />
          </div>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explorez nos catégories</h2>
          <div className="category-cards">
            <div className="category-card">
              <div className="category-icon">🖼️</div>
              <h3>Images de Chats</h3>
              <p>Des photos adorables de chats dans toutes les situations</p>
              <Link to="/image-cat" className="category-link">Découvrir →</Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🎬</div>
              <h3>GIFs de Chats</h3>
              <p>Des animations mignonnes et drôles de nos amis félins</p>
              <Link to="/gif-cat" className="category-link">Découvrir →</Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">😹</div>
              <h3>Memes de Chats</h3>
              <p>Les meilleures blagues et memes de chats sur internet</p>
              <Link to="/meme-cat" className="category-link">Découvrir →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Faits amusants */}
      <section className="fun-facts-section">
        <div className="container">
          <h2 className="section-title">Le saviez-vous ?</h2>
          <div className="fun-facts-container">
            <div className="fun-fact-card">
              <h3>Les ronronnements guérissent</h3>
              <p>Les fréquences du ronronnement d'un chat (entre 20 et 140 Hz) peuvent aider à la guérison des os et des tissus.</p>
            </div>
            <div className="fun-fact-card">
              <h3>Des chats très rapides</h3>
              <p>Les chats peuvent courir jusqu'à 48 km/h sur de courtes distances.</p>
            </div>
            <div className="fun-fact-card">
              <h3>Incroyables oreilles</h3>
              <p>Les chats peuvent pivoter leurs oreilles à 180 degrés et entendre des sons jusqu'à 65 kHz.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
