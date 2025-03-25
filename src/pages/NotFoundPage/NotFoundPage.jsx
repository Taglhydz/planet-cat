import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Non Trouvée</h2>
          <div className="sad-cat">😿</div>
          <p>Oups! Un chat s'est perdu...</p>
          <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
