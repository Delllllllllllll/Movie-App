import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useRef,
} from "react";
import movieLogo from "../../assets/movieLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "../SearchPage/SearchModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showTVDropdown, setShowTVDropdown] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);

  const moviesDropdownRef = useRef(null);
  const tvDropdownRef = useRef(null);

  const movieCategories = ["Popular", "Now Playing", "Upcoming", "Top Rated"];
  const tvCategories = ["Popular", "Airing Today", "On TV", "Top Rated"];
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutsite = (event) => {
      if (
        moviesDropdownRef.current &&
        !moviesDropdownRef.current.contains(event.target)
      ) {
        setShowMovieDropdown(false);
      }
      if (
        tvDropdownRef.current &&
        !tvDropdownRef.current.contains(event.target)
      ) {
        setShowTVDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutsite);
    return () => document.removeEventListener("click", handleClickOutsite);
  }, []);

  const renderDropdown = (items, isOpen, onItemClick) => {
    return (
      <div
        className={`absolute right-0 top-10 mt-2 w-48 rounded-md bg-[#0A0423] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        {items.map((item) => {
          return (
            <button
              key={item}
              onClick={() => onItemClick(item)}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#1a0d47] transition-colors"
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  };

  const handleClickModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 font-primary mx-10 sm:mx-20">
        {/* Logo */}
        <div>
          <img
            src={movieLogo}
            alt="Movie Logo"
            className="rounded-full w-20 h-20"
          />
        </div>

        <div>
          <ul className="list-none items-center gap-5 hidden md:flex">
            <li className="flex items-center">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-white text-[14px] font-primary hover:text-gray-300"
                >
                  Home
                </Link>
              </div>
            </li>

            <li className="relative" ref={moviesDropdownRef}>
              <div className="flex items-center cursor-pointer">
                <p
                  className="flex gap-1 text-white text-[14px] font-primary hover:text-gray-300"
                  onClick={() => {
                    setShowMovieDropdown(!showMovieDropdown);
                    setShowTVDropdown(false);
                  }}
                >
                  Movies
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#FFFFFF"
                    className={`transform transition-transform duration-300 ease-in-out ${
                      showMovieDropdown ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </p>

                {renderDropdown(movieCategories, showMovieDropdown, (item) => {
                  navigate(`/movies/${item}`);
                  setShowMovieDropdown(false);
                })}
              </div>
            </li>
            <li className="relative" ref={tvDropdownRef}>
              <div className="flex items-center cursor-pointer">
                <p
                  className="flex gap-1 text-white text-[14px] font-primary hover:text-gray-300"
                  onClick={() => {
                    setShowTVDropdown(!showTVDropdown);
                    setShowMovieDropdown(false);
                  }}
                >
                  TV Series
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#FFFFFF"
                    className={`transform transition-transform duration-300 ease-in-out ${
                      showTVDropdown ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </p>
                {renderDropdown(tvCategories, showTVDropdown, (item) => {
                  navigate(`/tv/${item}`);
                  setShowTVDropdown(false);
                })}
              </div>
            </li>

            <li>
              <button onClick={handleClickModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default Navbar;
