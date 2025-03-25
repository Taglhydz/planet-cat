import React, { useState, useEffect } from 'react';
import './MemeCatPage.css';
import { fetchMemes, fetchUserLikes, addLike, removeLike } from '../../services/api';

const MemeCatPage = () => {
  const [catMemes, setCatMemes] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['tous']);
  const [activeCategory, setActiveCategory] = useState('tous');

  // Charger les mèmes et les likes au chargement
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Charger les mèmes
        const memes = await fetchMemes();
        setCatMemes(memes);
        
        // Extraire les catégories uniques des mèmes (maintenant depuis un tableau)
        const allCategories = memes.flatMap(meme => meme.categories || []);
        const uniqueCategories = ['tous', ...new Set(allCategories)];
        setCategories(uniqueCategories);
        
        // Charger les likes de l'utilisateur
        const likes = await fetchUserLikes();
        const likesMap = {};
        likes.forEach(like => {
          likesMap[like.memeId] = true;
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

  const filteredMemes = activeCategory === 'tous' 
    ? catMemes 
    : catMemes.filter(meme => (meme.categories || []).includes(activeCategory));

  const toggleLike = async (id) => {
    try {
      // Optimistic UI update
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      // API call
      if (userLikes[id]) {
        await removeLike(id);
      } else {
        await addLike(id);
      }
      
      // Reload memes to get updated like counts
      const updatedMemes = await fetchMemes();
      setCatMemes(updatedMemes);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour du like:", error);
      // Rollback optimistic update if failed
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  if (loading) {
    return <div className="loading">Chargement des mèmes de chats...</div>;
  }

  return (
    <div className="meme-cat-page">
      <div className="container">
        <h1 className="page-title">Memes de Chats</h1>
        <p className="page-description">
          Les meilleurs memes de chats sur internet. Parcourez par catégorie et marquez vos favoris !
        </p>
        
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
        
        <div className="meme-grid">
          {filteredMemes.map((meme) => (
            <div key={meme.id} className="meme-card">
              <img src={meme.url} alt={meme.title} />
              <div className="meme-details">
                <div className="meme-actions">
                  <div className="meme-categories">
                    {(meme.categories || []).map(category => (
                      <span key={`${meme.id}-${category}`} className="meme-category">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="like-container">
                    <button 
                      className={`like-button ${userLikes[meme.id] ? 'liked' : ''}`}
                      onClick={() => toggleLike(meme.id)}
                    >
                      {userLikes[meme.id] ? '❤️' : '🤍'} 
                    </button>
                    <span className="like-count">{meme.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredMemes.length === 0 && (
            <div className="no-results">
              <p>Aucun meme ne correspond à cette catégorie 😿</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemeCatPage;
