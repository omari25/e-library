import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initialBooks } from './data';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import ReadingListPage from './pages/ReadingListPage';

const App = () => {
  const [books, setBooks] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('elibrary-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('elibrary-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleAddReview = (bookId, review) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        const updatedReviews = [...book.reviews, review];
        const newRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...book,
          reviews: updatedReviews,
          rating: newRating
        };
      }
      return book;
    }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookDetailPage
                books={books}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
                onAddReview={handleAddReview}
              />
            }
          />
          <Route
            path="/reading-list"
            element={
              <ReadingListPage
                books={books}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;