import Navbar from "./Navbar";
import MovieSection from "../Movies/MovieSection";
import React, { useState, useEffect } from "react";
import {
  useMoviesOrTvSection,
  useHeroMovieSlider,
} from "../../hooks/useMovies";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function Hero() {
  const location = useLocation();
  const [heroMovies, setHeroMovies] = useState([]);
  const {
    data: popularMovies,
    error,
    totalPages,
    isLoading,
  } = useMoviesOrTvSection("movie", "popular", 1);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchHeroMovies = async () => {
      if (popularMovies && popularMovies.length > 0) {
        const movieDetails = await Promise.all(
          popularMovies.map(async (movie) => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
              );
              return await response.json();
            } catch (error) {
              console.log(
                `Error fetching details for movie ID ${movie.id}:`,
                error
              );
              return null;
            }
          })
        );
        setHeroMovies(movieDetails.filter((movie) => movie !== null));
      }
    };
    fetchHeroMovies();
  }, [popularMovies]);

  useEffect(() => {
    if (location.hash && !location.pathname.includes("/movie/")) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="smooth-scrolling">
      <Navbar />
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        autoplay={{ delay: 3500 }}
        effect="fade"
        speed={1200}
        loop={heroMovies.length >= 3} // Only enable loop if enough slides
        slidesPerView={1}
        slidesPerGroup={1}
        className="relative w-full h-screen"
      >
        {heroMovies.slice(0, 10).map((movie) => {
          const runtime = movie.runtime
            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
            : "N/A";
          const heroImg = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "https://via.placeholder.com/1920x1080";
          return (
            <SwiperSlide>
              <section
                className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${heroImg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0423] via-gray-950/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f082e] to-transparent"></div>

                <div className="absolute top-130 left-10 md:top-90 md:left-20 max-w-[500px] transform -translate-y-1/2 z-10 text-left">
                  <h1 className="text-4xl md:text-5xl mb-4 font-primary font-bold">
                    {movie.original_title}
                  </h1>
                  <div>
                    <span className="bg-[#1c086c] rounded-sm p-[2px] font-primary text-[12px] mr-2">
                      TMDB
                    </span>
                    <span className="font-primary text-[12px] mr-2">
                      9.2 (12.222)
                    </span>
                    <span className="font-primary text-[12px]">
                      • {movie.release_date}
                    </span>
                    <span className="font-primary text-[12px]">
                      | {runtime}
                    </span>
                    <span className="font-primary text-[12px]">
                      |{" "}
                      {movie.genres[1]?.name ||
                        movie.genres[0]?.name ||
                        "Unknown"}
                    </span>

                    <p className="text-[15px] md:text-[17px] mb-6 font-primary font-light mt-2">
                      {movie.overview ||
                        "No overview available for this movie."}
                    </p>

                    <div className="flex items-center gap-4 font-primary">
                      <button className="flex items-center px-7 py-3 bg-[#0A0423] text-white rounded-md hover:bg-[#1a0d47] transition duration-300 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                        </svg>
                        <span className="text-base font-medium">Play</span>
                      </button>
                      <button className="flex items-center px-7 py-3 gap-2 bg-[#0A0423] text-white rounded-md hover:bg-[#1a0d47] transition duration-300 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <span className="text-base font-medium">More info</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
        ;
      </Swiper>

      <section className="min-h-screen bg-gradient-to-b from-[#0f082e] via-[#0a0423] to-[#0f082e] p-5">
        <MovieSection title={"Upcoming"} id={"topRMovies"} />
        <MovieSection title={"Popular"} id={"nMovies"} />
        <MovieSection title={"Top Rated"} id={"upMovies"} />
      </section>
    </div>
  );
}

export default Hero;
