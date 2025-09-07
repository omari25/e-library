import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Home, List } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">E-Library</h1>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link to="/reading-list" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <List className="w-5 h-5" />
              Reading List
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;