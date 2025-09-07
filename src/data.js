export const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Literature",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    rating: 4.5,
    reviews: [
      { id: 1, user: "John Doe", rating: 5, comment: "A timeless masterpiece!", date: "2024-08-15" },
      { id: 2, user: "Jane Smith", rating: 4, comment: "Beautiful prose and compelling characters.", date: "2024-08-10" }
    ],
    pdfUrl: "sample.pdf"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic Literature",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    rating: 5.0,
    reviews: [
      { id: 3, user: "Mike Johnson", rating: 5, comment: "Powerful and moving story.", date: "2024-08-12" }
    ],
    pdfUrl: "sample.pdf"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Science Fiction",
    description: "A dystopian novel about totalitarian control and surveillance in a future society.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    rating: 5.0,
    reviews: [
      { id: 4, user: "Sarah Wilson", rating: 5, comment: "Chillingly relevant even today.", date: "2024-08-08" }
    ],
    pdfUrl: "sample.pdf"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    description: "A romantic novel about manners, upbringing, morality, education, and marriage.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    rating: null,
    reviews: [],
    pdfUrl: "sample.pdf"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Classic Literature",
    description: "A controversial novel about teenage rebellion and alienation.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg",
    rating: null,
    reviews: [],
    pdfUrl: "sample.pdf"
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    description: "An epic science fiction novel set on the desert planet Arrakis.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    rating: 5.0,
    reviews: [
      { id: 5, user: "Alex Brown", rating: 5, comment: "Epic world-building and complex plot.", date: "2024-08-14" }
    ],
    pdfUrl: "sample.pdf"
  }
];

export const calculateRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const updateBookRatings = (books) => {
  return books.map(book => ({
    ...book,
    rating: calculateRating(book.reviews)
  }));
};