import React, { useState, useEffect } from 'react';
import './ImageCatPage.css';
import { fetchImages, fetchUserImageLikes, addImageLike, removeImageLike } from '../../services/api';

const ImageCatPage = () => {
  const [catImages, setCatImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userLikes, setUserLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['tous']);
  const [activeCategory, setActiveCategory] = useState('tous');

  // Charger les images et les likes au chargement
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Charger les images
        const images = await fetchImages();
        setCatImages(images);
        
        // Extraire les catégories uniques des images
        const uniqueCategories = ['tous', ...new Set(images.map(img => img.category))];
        setCategories(uniqueCategories);
        
        // Charger les likes de l'utilisateur
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
    : catImages.filter(image => image.category === activeCategory);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleLike = async (id, event) => {
    // Empêcher l'ouverture de l'image lorsqu'on clique sur le bouton like
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    
    try {
      // Optimistic UI update
      setUserLikes(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      // API call
      if (userLikes[id]) {
        await removeImageLike(id);
      } else {
        await addImageLike(id);
      }
      
      // Reload images to get updated like counts
      const updatedImages = await fetchImages();
      setCatImages(updatedImages);
      
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
    return <div className="loading">Chargement des images de chats...</div>;
  }

  return (
    <div className="image-cat-page">
      <div className="container">
        <h1 className="page-title">Images de Chats</h1>
        <p className="page-description">
          Découvrez notre collection d'adorables photos de chats. Cliquez sur une image pour l'agrandir.
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
        
        <div className="image-grid">
          {filteredImages.map((image) => (
            <div key={image.id} className="image-card" onClick={() => openImage(image)}>
              <img src={image.url} alt={image.title} />
              <div className="image-footer">
                <div className="image-title">{image.title}</div>
                <div className="image-info">
                  <span className="image-category">{image.category}</span>
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
              <h3>{selectedImage.title}</h3>
              <div className="modal-info">
                <span className="modal-category">{selectedImage.category}</span>
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
