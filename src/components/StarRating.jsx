import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = "w-4 h-4", interactive = false, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} cursor-pointer transition-colors ${
            star <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
          onClick={() => interactive && onRating && onRating(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating ? rating.toFixed(1) : '0.0'}
      </span>
    </div>
  );
};

export default StarRating;