import React, { useState, useEffect } from "react";
import Navbar from "../Homepage/Navbar";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination.jsx";
import Card from "../Movies/MovieCard.jsx";
import { useMoviesOrTvSection } from "../../hooks/useMovies.jsx";

export function TVFilterPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { filter } = useParams();

  // Updated category mapping for TV shows
  const categoryMapping = {
    Popular: "popular",
    "Airing Today": "airing_today",
    "On TV": "on_the_air",
    "Top Rated": "top_rated",
  };

  const apiEndpoint =
    categoryMapping[filter] || filter.toLowerCase().replace(/\s+/g, "_");

  console.log("TV Filter:", filter);
  console.log("TV API Endpoint:", apiEndpoint);

  const { data, error, totalPages, isLoading } = useMoviesOrTvSection(
    "tv",
    apiEndpoint,
    Number(currentPage)
  );
  useEffect(() => {
    console.log("API Response:", data);
    console.log("Endpoint:", apiEndpoint);
  }, []);

  const getCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  // Add error handling display
  if (error) {
    console.error("TV Filter Error:", error);
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-gradient-to-b from-[#0a0423] to-[#0a0423] text-white pt-27">
        <div className="max-w-[75rem] mx-auto mt-6">
          <div>
            <h1 className="text-[30px] font-primary">{filter}</h1>
          </div>

          {/* Add error display */}
          {error && (
            <div className="text-red-500 mb-4 p-4 bg-red-100 rounded">
              Error: {error.message || "Something went wrong"}
            </div>
          )}

          <div className="grid pt-1 pb-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {isLoading ? (
              Array(20)
                .fill(0)
                .map((_, i) => <Card key={i} isLoading={true} />)
            ) : data && data.length > 0 ? (
              data.map((show) => (
                <Card
                  key={show.id}
                  movieData={show}
                  isLoading={false}
                  mediaType="tv"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p>No TV shows found for "{filter}"</p>
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
