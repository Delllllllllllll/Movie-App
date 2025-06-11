import heroImg from "../../assets/cardImg.jpg";
import { useNavigate } from "react-router-dom";

function CardSkeleton() {
  return (
    <div className="w-55 h-80 overflow-hidden my-3 shadow-lg relative animate-pulse">
      <div className="w-full h-full bg-gray-700 rounded-lg"></div>
    </div>
  );
}

function Card({ movieData, isLoading }) {
  const navigate = useNavigate();

  const handleMovieCardClick = (e) => {
    e.preventDefault(); 
    window.scrollTo(0, 0); 
    navigate(`/movie/${movieData.id}`, {
      state: { movieData }
    });
  };

  if(isLoading) {
    return <CardSkeleton />
  }

  if (!movieData) {
    return (
      <div className="w-55 h-80 overflow-hidden my-3 shadow-lg relative bg-gray-800">
        <p className="text-white text-center pt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="w-55 h-80 overflow-hidden my-3 shadow-lg relative cursor-pointer"
      onClick={handleMovieCardClick}
    >
      <img
        src={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : heroImg
        }
        alt={movieData.title || "Movie Poster"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Card;
