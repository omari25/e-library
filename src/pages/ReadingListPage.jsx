import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

const ReadingListPage = ({ books, favorites, onToggleFavorite }) => {
  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm="" setSearchTerm={() => {}} selectedCategory="" setSelectedCategory={() => {}} categories={[]} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Reading List</h2>
          <p className="text-gray-600">
            {favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} in your reading list
          </p>
        </div>
        
        {favoriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onToggleFavorite={onToggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your reading list is empty</h3>
            <p className="text-gray-600 mb-4">Start adding books to your reading list to keep track of what you want to read.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReadingListPage;