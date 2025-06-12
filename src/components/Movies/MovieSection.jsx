import Card from "./MovieCard";
import { useMoviesOrTvSection } from "../../hooks/useMovies";

function MovieSection({ title, id }) {
  const { data, error, isLoading } = useMoviesOrTvSection(
    'movie', 
    title.toLowerCase().replace(" ", "_"), 1
  );
  return (
    <div id={id}>
      <h3 className="text-2xl text-white font-primary my-3 ml-5">{title}</h3>
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 pb-4 px-5">
          {data.map((movie) => {
            return <div key={movie.id} className="flex-shrink-0">
              <Card movieData={movie} mediaType='movie' />
            </div>;
          })};
        </div>
      </div>
    </div>
  );
}

// 
export default MovieSection;
