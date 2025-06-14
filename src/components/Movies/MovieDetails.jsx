import Casts from "./Casts";
import YoutubeEmbed from "./YoutubeEmbed";
import Nav from "../Homepage/Navbar";
import { useGenres, useCasts } from "../../hooks/useMovies";
import { useLocation, useParams } from "react-router-dom";

function MovieDetails({ movieData }) {
  const { id } = useParams();
  const location = useLocation();
  const movie = location.state?.movieData || movieData;
  const mediaType = location.pathname.includes("tv") ? "tv" : "movie";

  const heroImg = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://image.tmdb.org/t/p/original/8uO0c1d2k3m4n5o6p7q8r9s0t1u2v3w4.jpg";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://dummyimage.com/500x750/1a1a1a/ffffff&text=Movie+Poster+Not+Available";

  const { genres: genreList, error } = useGenres(mediaType);
  const { casts, error: castError } = useCasts(mediaType, id);
  const movieDetailsGenresId = movie.genre_ids || [];

  const yearRelease = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const genres = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "N/A";
  const language =
    new Intl.DisplayNames("en-US", { type: "language" }).of(
      `${movie.original_language}`
    ) || "Unknown Language";

  const genreNames = movieDetailsGenresId
    .map((id) => genreList.find((genre) => genre.id === id)?.name)
    .filter(Boolean);

  return (
    <div>
      <Nav />
      <section
        className="relative w-full min-h-screen bg-cover bg-center flex items-end text-white pt-[80px]"
        style={{ backgroundImage: `url(${heroImg})` }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0423] via-gray-950/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-100 bg-gradient-to-t from-[#0a0423] to-transparent"></div>

        <div className="relative z-10 px-6 py-10 w-full max-w-[80rem]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex justify-center md:justify-start">
              <img
                className="h-[300px] md:h-[350px] w-auto shadow-2xl rounded object-cover"
                src={posterUrl}
                alt="Movie Poster"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl mb-4 font-primary font-bold leading-tight">
                {movie.original_title ||
                  movie.name ||
                  "Movie Title Not Available"}
              </h1>

              <p className="font-primary mb-3 text-lg">
                {yearRelease} ● {language}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {genreNames && genreNames.length > 0 ? (
                  genreNames.map((genre, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-[#33415580] py-1 px-3 rounded-sm font-primary text-[12px]"
                    >
                      {genre}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center bg-[#33415580] py-1 px-3 rounded-sm font-primary text-[12px]">
                    No Genres Available
                  </div>
                )}
              </div>

              <div className="max-w-[500px] leading-6 font-secondary font-normal text-[14px] mx-auto md:mx-0">
                {movie.overview || "No overview available for this movie."}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gradient-to-b from-[#0a0423] to-[#0a0423] text-white pt-16">
        <div className="flex justify-center">
          <Casts />
        </div>
        <div className="">
          <YoutubeEmbed />
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;
