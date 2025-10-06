import halfStarIcon from '../assets/star-half-yellow-icon.svg';
type StarsRatingProps = {
  rating: number;
};

export default function StartsRating({ rating }: StarsRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center text-[#FFC102] text-xl">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return '★';
        } else if (i === fullStars && hasHalfStar) {
          return <img src={halfStarIcon} className="w-3 h-3" alt="hata" key={i} />;
        } else {
          return '☆';
        }
      })}
    </div>
  );
}
