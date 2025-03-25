export const API_URL = 'http://localhost:3001';

// Récupérer tous les mèmes
export const fetchMemes = async () => {
  const response = await fetch(`${API_URL}/memes`);
  return response.json();
};

// Récupérer les likes de l'utilisateur (simulé avec un ID utilisateur fixe)
export const fetchUserLikes = async () => {
  const userId = 'user-123'; // Normalement, vous utiliseriez l'ID de l'utilisateur connecté
  const response = await fetch(`${API_URL}/likedMemes?userId=${userId}`);
  return response.json();
};

// Ajouter un like
export const addLike = async (memeId) => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedMemes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, memeId, timestamp: new Date() }),
  });
  
  // Mettre à jour le compteur de likes du mème
  const memeResponse = await fetch(`${API_URL}/memes/${memeId}`);
  const meme = await memeResponse.json();
  
  await fetch(`${API_URL}/memes/${memeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: meme.likes + 1 }),
  });
  
  return response.json();
};

// Retirer un like
export const removeLike = async (memeId) => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedMemes?userId=${userId}&memeId=${memeId}`);
  const likes = await response.json();
  
  if (likes.length > 0) {
    await fetch(`${API_URL}/likedMemes/${likes[0].id}`, {
      method: 'DELETE',
    });
    
    // Mettre à jour le compteur de likes du mème
    const memeResponse = await fetch(`${API_URL}/memes/${memeId}`);
    const meme = await memeResponse.json();
    
    await fetch(`${API_URL}/memes/${memeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: Math.max(0, meme.likes - 1) }),
    });
  }
  
  return { success: true };
};

// Fonctions pour les Images
export const fetchImages = async () => {
  const response = await fetch(`${API_URL}/catImages`);
  return response.json();
};

export const fetchUserImageLikes = async () => {
  const userId = 'user-123'; 
  const response = await fetch(`${API_URL}/likedImages?userId=${userId}`);
  return response.json();
};

export const addImageLike = async (imageId) => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedImages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, imageId, timestamp: new Date() }),
  });
  
  // Mettre à jour le compteur de likes de l'image
  const imageResponse = await fetch(`${API_URL}/catImages/${imageId}`);
  const image = await imageResponse.json();
  
  await fetch(`${API_URL}/catImages/${imageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: image.likes + 1 }),
  });
  
  return response.json();
};

export const removeImageLike = async (imageId) => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedImages?userId=${userId}&imageId=${imageId}`);
  const likes = await response.json();
  
  if (likes.length > 0) {
    await fetch(`${API_URL}/likedImages/${likes[0].id}`, {
      method: 'DELETE',
    });
    
    // Mettre à jour le compteur de likes de l'image
    const imageResponse = await fetch(`${API_URL}/catImages/${imageId}`);
    const image = await imageResponse.json();
    
    await fetch(`${API_URL}/catImages/${imageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: Math.max(0, image.likes - 1) }),
    });
  }
  
  return { success: true };
};

// Fonctions pour les GIFs
export const fetchGifs = async () => {
  const response = await fetch(`${API_URL}/catGifs`);
  return response.json();
};

export const fetchUserGifLikes = async () => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedGifs?userId=${userId}`);
  return response.json();
};

export const addGifLike = async (gifId) => {
  const userId = 'user-123';
  // Ajouter le like à la liste des likes
  const response = await fetch(`${API_URL}/likedGifs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, gifId, timestamp: new Date() }),
  });
  
  // Mettre à jour le compteur de likes du gif
  const gifResponse = await fetch(`${API_URL}/catGifs/${gifId}`);
  const gif = await gifResponse.json();
  
  await fetch(`${API_URL}/catGifs/${gifId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: gif.likes + 1 }),
  });
  
  return response.json();
};

export const removeGifLike = async (gifId) => {
  const userId = 'user-123';
  const response = await fetch(`${API_URL}/likedGifs?userId=${userId}&gifId=${gifId}`);
  const likes = await response.json();
  
  if (likes.length > 0) {
    await fetch(`${API_URL}/likedGifs/${likes[0].id}`, {
      method: 'DELETE',
    });
    
    // Mettre à jour le compteur de likes du gif
    const gifResponse = await fetch(`${API_URL}/catGifs/${gifId}`);
    const gif = await gifResponse.json();
    
    await fetch(`${API_URL}/catGifs/${gifId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: Math.max(0, gif.likes - 1) }),
    });
  }
  
  return { success: true };
};
