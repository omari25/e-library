import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, BookOpen, Plus, User } from 'lucide-react';
import Header from '../components/Header';
import StarRating from '../components/StarRating';

const BookDetailPage = ({ books, onToggleFavorite, favorites, onAddReview }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.id === parseInt(id));
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 0,
    comment: ''
  });

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.user.trim() && reviewForm.rating > 0 && reviewForm.comment.trim()) {
      const newReview = {
        id: Date.now(),
        user: reviewForm.user,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      onAddReview(book.id, newReview);
      setReviewForm({ user: '', rating: 0, comment: '' });
      setShowReviewForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm="" setSearchTerm={() => {}} selectedCategory="" setSelectedCategory={() => {}} categories={[]} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Books
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
              />
              
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => onToggleFavorite(book.id)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    favorites.includes(book.id)
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(book.id) ? 'fill-current' : ''
                    }`}
                  />
                  {favorites.includes(book.id) ? 'Remove from Reading List' : 'Add to Reading List'}
                </button>
                
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Read Now
                </button>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {book.category}
                </span>
                <StarRating rating={book.rating} size="w-5 h-5" />
                <span className="text-gray-600">({book.reviews.length} reviews)</span>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
              
              <div className="border-t pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Write Review
                  </button>
                </div>
                
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={reviewForm.user}
                        onChange={(e) => setReviewForm({...reviewForm, user: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <StarRating
                          rating={reviewForm.rating}
                          size="w-6 h-6"
                          interactive={true}
                          onRating={(rating) => setReviewForm({...reviewForm, rating})}
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Write your review..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                
                <div className="space-y-4">
                  {book.reviews.length > 0 ? (
                    book.reviews.map(review => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} size="w-4 h-4" />
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-11">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">
                      No reviews yet. Be the first to write a review!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;