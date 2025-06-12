import React, { useState, useEffect, useCallback } from "react";
import cardImg from "../../assets/cardImg.jpg";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
function SearchModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // fetch serach shows
  async function fetchSearchShow(q) {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    if (!q) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${q}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  const handleBackdropClick = (e) => {
    // Only close if clicked directly on the backdrop not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // debounce to avoid redundancy and save performance
  const debounceFetch = useCallback(
    debounce((q) => {
      fetchSearchShow(q);
    }, 300),
    []
  );

  // run everytime the input change with debounce
  const handleInputChange = (e) => {
    const q = e.target.value;
    debounceFetch(q);
  };

  const handleResultsClick = (show) => {
    const mediaType = show.media_type;
    navigate(`/${mediaType}/${show.id}`, {
      state: { movieData: show },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
          <div className="sm:flex sm:items-start font-primary relative">
            <input
              type="text"
              className="w-full pl-10 px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
              placeholder="Search for movies, series, or actors..."
              onChange={handleInputChange}
            />
            <svg
              className="absolute left-3 top-2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1E124A"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </div>
        </div>

        <div className="search-results max-h-[40vh] mt-4 overflow-y-auto scroll-thin no-scrollbar">
          {results.map((show, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-2 border-b border-gray-200"
              onClick={() => handleResultsClick(show)}
            >
              <div className="flex space-x-2 font-primary">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt="Movie Poster"
                  className="w-16 h-24 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <p className="text-slate-900 line-clamp-1">
                    {show.original_title}
                  </p>
                  <p className="text-slate-900 line-clamp-1">
                    {show.release_date || show.first_air_date
                      ? new Date(
                          show.release_date || show.first_air_date
                        ).getFullYear()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex font-primary justify-center items-center md:text-xs text-[10px] text-slate-100 md:min-w-[70px] min-w-[60px] md:max-w-[70px] max-w-[60px] bg-[#1E124A] rounded-full px-2 py-1 mt-2">
                Movie
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
