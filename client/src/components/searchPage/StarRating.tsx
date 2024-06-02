import React from 'react';

interface RatingProps {
  ratings: number[] | number; // Allow for single number or array of numbers
}

const StarRating: React.FC<RatingProps> = ({ ratings }) => {
  let overallRating;
  if (Array.isArray(ratings)) {
    overallRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
  } else {
    overallRating = ratings; // If single number, assign directly
  }

  const renderStars = (rating: number) => {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div className="flex">
        {[...Array(filledStars)].map((_, index) => (
          <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192-3.046-2.97a.75.75 0 0 1 .416-1.279l4.21-.612L9.327 2.42A.75.75 0 0 1 10 2z" clipRule="evenodd" />
          </svg>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192-3.046-2.97a.75.75 0 0 1 .416-1.279l4.21-.612L9.327 2.42A.75.75 0 0 1 10 2z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <span className="mr-2 text-lg font-semibold">{overallRating.toFixed(1)}</span>
        {renderStars(overallRating)}
      </div>
      {Array.isArray(ratings) && <p>Rating out of {ratings.length} ratings</p>}
    </div>
  );
};

export default StarRating;
