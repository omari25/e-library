import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import StarRating from './StarRating';

const BookCard = ({ book, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => onToggleFavorite(book.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-sm text-blue-600 mb-2">{book.category}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between">
          <StarRating rating={book.rating} />
          <Link
            to={`/book/${book.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;