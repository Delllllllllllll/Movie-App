import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { useParams } from "react-router-dom";
import { useMoviesOrTvSection } from "../../hooks/useMovies.jsx";
import Pagination from "./Pagination.jsx";
import Card from "../Movies/MovieCard.jsx";

export function MoviesFilterPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { filter } = useParams();

  const categoryMapping = {
    Popular: "popular",
    "Airing Today": "airing_today",
    "On TV": "on_the_air",
    "Top Rated": "top_rated",
  };

  const apiEndpoint =
    categoryMapping[filter] || filter.toLowerCase().replace(/\s+/g, "_");

  console.log(apiEndpoint);
  const { data, error, totalPages, isLoading } = useMoviesOrTvSection(
    "movie",
    apiEndpoint,
    Number(currentPage)
  );

  const getCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gradient-to-b from-[#0a0423] to-[#0a0423] text-white pt-27">
        <div className="max-w-[75rem] mx-auto mt-6">
          <div>
            <h1 className="text-[30px] font-primary">{filter}</h1>
          </div>
          <div className="grid pt-1 pb-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 ">
            {isLoading ? (
              Array(20)
                .fill(0)
                .map((_, i) => <Card key={i} isLoading={true} />)
            ) : data && data.length > 0 ? (
              data.map((movie) => (
                <Card key={movie.id} movieData={movie} isLoading={false} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p>No data found.</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <Pagination
            totalPages={totalPages > 500 ? 500 : totalPages}
            currentPage={currentPage}
            onPageChange={getCurrentPage}
          />
        </div>
      </main>
    </>
  );
}
