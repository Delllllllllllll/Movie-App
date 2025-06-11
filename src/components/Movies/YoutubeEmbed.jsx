import Video from "./Video";
import { useMovieOrTvVideos } from "../../hooks/useMovies";
import { useParams, useLocation } from "react-router-dom";

function YouTubeEmbed() {
  const { id } = useParams();
  const location = useLocation();

  const mediaType = location.pathname.includes('tv') ? 'tv' : 'movie';

  const { videos, error } = useMovieOrTvVideos(mediaType,id);
  const movieTrailers = videos.length > 5 ? videos.slice(0, 5) : videos;

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-25 px-4">
      <div className="mb-5">
        <h2 className="font-primary text-3xl text-left">Videos</h2>
      </div>
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex space-x-8 pb-4">
          {movieTrailers &&
            movieTrailers.map((video) => {
              return <Video video={video} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default YouTubeEmbed;
