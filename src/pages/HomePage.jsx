import React from 'react';
import { BookOpen } from 'lucide-react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

const HomePage = ({ books, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, onToggleFavorite, favorites }) => {
  const categories = [...new Set(books.map(book => book.category))];
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Great Books
          </h2>
          <p className="text-gray-600">
            Showing {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(book.id)}
            />
          ))}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;