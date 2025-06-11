import Hero from "./components/Homepage/Homepage";
import NotFoundPage from "./components/NotFound.jsx";
import MovieDetails from "./components/Movies/MovieDetails.jsx";
import { MoviesFilterPage } from "./components/FilterPage/MoviesFilter.jsx";
import { TVFilterPage } from "./components/FilterPage/TvFilter.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/tv/:id" element={<MovieDetails />}></Route>
        <Route path="/movies/:filter" element={<MoviesFilterPage />}></Route>
        <Route path="/tv/:filter" element={<TVFilterPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;


