import React, { useState } from "react";
import cardImg from "../../assets/cardImg.jpg";

function SearchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    console.log("Backdrop clicked");
    if (e.target === e.currentTarget) {
      console.log("WORKING");
      onClose();
    }
  };
  
  return (
    <>
      <div
        className="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 backdrop-blur-sm bg-transparent"
          aria-hidden="true"
          onClick={handleBackdropClick}
        ></div>

        <div className="fixed inset-0 z-40 w-screen overflow-y-auto no-scrollbar">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start font-primary">
                  <input
                    type="text"
                    className="relative w-full pl-10 px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
                    placeholder="Search for movies, series, or actors..."
                  />
                  <svg
                    className="absolute left-8 top-8 cursor-pointer"
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
                <div>
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <div className="flex space-x-2 font-primary">
                      <img
                        src={cardImg}
                        alt="Movie Poster"
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-slate-900 line-clamp-1">
                          Spider Man
                        </p>
                        <p className="text-slate-900 line-clamp-1">2022</p>
                      </div>
                    </div>
                    <div className="flex font-primary justify-center items-center md:text-xs text-[10px] text-slate-100 md:min-w-[70px] min-w-[60px] md:max-w-[70px]  max-w-[60px] bg-[#1E124A] rounded-full px-2 py-1 mt-2">
                      Movie
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <div className="flex space-x-2 font-primary">
                      <img
                        src={cardImg}
                        alt="Movie Poster"
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-slate-900 line-clamp-1">
                          Spider Man
                        </p>
                        <p className="text-slate-900 line-clamp-1">2022</p>
                      </div>
                    </div>
                    <div className="flex font-primary justify-center items-center md:text-xs text-[10px] text-slate-100 md:min-w-[70px] min-w-[60px] md:max-w-[70px]  max-w-[60px] bg-[#1E124A] rounded-full px-2 py-1 mt-2">
                      Movie
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <div className="flex space-x-2 font-primary">
                      <img
                        src={cardImg}
                        alt="Movie Poster"
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-slate-900 line-clamp-1">
                          Spider Man
                        </p>
                        <p className="text-slate-900 line-clamp-1">2022</p>
                      </div>
                    </div>
                    <div className="flex font-primary justify-center items-center md:text-xs text-[10px] text-slate-100 md:min-w-[70px] min-w-[60px] md:max-w-[70px]  max-w-[60px] bg-[#1E124A] rounded-full px-2 py-1 mt-2">
                      Movie
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <div className="flex space-x-2 font-primary">
                      <img
                        src={cardImg}
                        alt="Movie Poster"
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-slate-900 line-clamp-1">
                          Spider Man
                        </p>
                        <p className="text-slate-900 line-clamp-1">2022</p>
                      </div>
                    </div>
                    <div className="flex font-primary justify-center items-center md:text-xs text-[10px] text-slate-100 md:min-w-[70px] min-w-[60px] md:max-w-[70px]  max-w-[60px] bg-[#1E124A] rounded-full px-2 py-1 mt-2">
                      Movie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
