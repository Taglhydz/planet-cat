import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ImageCatPage.css';
import { fetchImages, fetchUserImageLikes, addImageLike, removeImageLike } from '../../services/api';

const ImageCatPage = () => {
  const [catImages, setCatImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userLikes, setUserLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['tous']);
  const [activeCategory, setActiveCategory] = useState('tous');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const images = await fetchImages();
        
        const uniqueImages = [];
        const seenIds = new Set();
        
        images.forEach(image => {
          if (!seenIds.has(image.id)) {
            seenIds.add(image.id);
            uniqueImages.push(image);
          } else {
            console.warn(`Image avec ID dupliqué détectée: ${image.id}`);
          }
        });
        
        setCatImages(uniqueImages);
        
        const allCategories = uniqueImages.flatMap(img => img.categories || []);
        const uniqueCategories = ['tous', ...new Set(allCategories)];
        setCategories(uniqueCategories);
        
        const likes = await fetchUserImageLikes();
        const likesMap = {};
        likes.forEach(like => {
          likesMap[like.imageId] = true;
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

  const filteredImages = activeCategory === 'tous' 
    ? catImages 
    : catImages.filter(image => (image.categories || []).includes(activeCategory));

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleLike = async (id, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    
    try {
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      if (userLikes[id]) {
        await removeImageLike(id);
      } else {
        await addImageLike(id);
      }
      
      const updatedImages = await fetchImages();
      
      const uniqueUpdatedImages = [];
      const seenIds = new Set();
      
      updatedImages.forEach(image => {
        if (!seenIds.has(image.id)) {
          seenIds.add(image.id);
          uniqueUpdatedImages.push(image);
        }
      });
      
      setCatImages(uniqueUpdatedImages);
      
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
    return <div className="loading">Chargement des images de chats...</div>;
  }

  return (
    <div className="image-cat-page">
      <div className="container">
        <h1 className="page-title">Images de Chats</h1>
        <p className="page-description">
          Découvrez notre collection d'adorables photos de chats. Cliquez sur une image pour l'agrandir.
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
        
        <div className="image-grid">
          {filteredImages.map((image) => (
            <div key={image.id} className="image-card" onClick={() => openImage(image)}>
              <img src={image.url} alt={image.title} />
              <div className="image-footer">
                <div className="image-info">
                  <div className="image-categories">
                    {(image.categories || []).map(category => (
                      <span key={`${image.id}-${category}`} className="image-category">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="like-container">
                    <button 
                      className={`like-button ${userLikes[image.id] ? 'liked' : ''}`}
                      onClick={(e) => toggleLike(image.id, e)}
                    >
                      {userLikes[image.id] ? '❤️' : '🤍'}
                    </button>
                    <span className="like-count">{image.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredImages.length === 0 && (
            <div className="no-results">
              <p>Aucune image ne correspond à cette catégorie 😿</p>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeImage}>&times;</span>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="modal-footer">
              <div className="modal-info">
                <div className="modal-categories">
                  {(selectedImage.categories || []).map(category => (
                    <span key={`modal-${selectedImage.id}-${category}`} className="modal-category">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="like-container">
                  <button 
                    className={`like-button ${userLikes[selectedImage.id] ? 'liked' : ''}`}
                    onClick={() => toggleLike(selectedImage.id, { stopPropagation: () => {} })}
                  >
                    {userLikes[selectedImage.id] ? '❤️' : '🤍'}
                  </button>
                  <span className="like-count">{selectedImage.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCatPage;
