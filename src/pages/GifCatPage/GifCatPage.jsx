import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GifCatPage.css';
import { fetchGifs, fetchUserGifLikes, addGifLike, removeGifLike } from '../../services/api';

const GifCatPage = () => {
  const [catGifs, setCatGifs] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['tous']);
  const [activeCategory, setActiveCategory] = useState('tous');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const gifs = await fetchGifs();
        setCatGifs(gifs);
        
        const allCategories = gifs.flatMap(gif => gif.categories || []);
        const uniqueCategories = ['tous', ...new Set(allCategories)];
        setCategories(uniqueCategories);
        
        const likes = await fetchUserGifLikes();
        const likesMap = {};
        likes.forEach(like => {
          likesMap[like.gifId] = true;
        });
        setUserLikes(likesMap);
        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredGifs = activeCategory === 'tous' 
    ? catGifs 
    : catGifs.filter(gif => (gif.categories || []).includes(activeCategory));

  const toggleLike = async (id) => {
    try {
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      if (userLikes[id]) {
        await removeGifLike(id);
      } else {
        await addGifLike(id);
      }
      
      const updatedGifs = await fetchGifs();
      setCatGifs(updatedGifs);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour du like:", error);
      
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div className="loading">Chargement des GIFs de chats...</div>;
  }

  return (
    <div className="gif-cat-page">
      <div className="container">
        <h1 className="page-title">GIFs de Chats</h1>
        <p className="page-description">
          Une collection de GIFs amusants et mignons de nos amis félins.
        </p>
        
        <div className="back-button-container">
          <Link to="/" className="back-button" onClick={handleNavClick}>
            ← Retour à l'accueil
          </Link>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button 
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="gif-grid">
          {filteredGifs.map((gif) => (
            <div key={gif.id} className="gif-card">
              <div className="gif-container">
                <img src={gif.url} alt={gif.title} />
              </div>
              <div className="gif-footer">
                <div className="gif-info">
                  <div className="gif-categories">
                    {(gif.categories || []).map(category => (
                      <span key={`${gif.id}-${category}`} className="gif-category">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="like-container">
                    <button 
                      className={`like-button ${userLikes[gif.id] ? 'liked' : ''}`}
                      onClick={() => toggleLike(gif.id)}
                    >
                      {userLikes[gif.id] ? '❤️' : '🤍'} 
                    </button>
                    <span className="like-count">{gif.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredGifs.length === 0 && (
            <div className="no-results">
              <p>Aucun GIF ne correspond à cette catégorie 😿</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GifCatPage;
