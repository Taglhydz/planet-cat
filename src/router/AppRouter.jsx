import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';

import HomePage 	from '../pages/HomePage/HomePage';
import GifCatPage 	from '../pages/GifCatPage/GifCatPage';
import ImageCatPage from '../pages/ImageCatPage/ImageCatPage';
import MemeCatPage 	from '../pages/MemeCatPage/MemeCatPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRouter = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" 		 element={<HomePage 	/>} />
            <Route path="/gif-cat" 	 element={<GifCatPage 	/>} />
            <Route path="/image-cat" element={<ImageCatPage />} />
            <Route path="/meme-cat"  element={<MemeCatPage 	/>} />
            <Route path="*" 		 element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
