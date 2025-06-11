import React, { useState, useEffect } from "react";
import {
  fetchMovieOrTv,
  fetchMediaDetails,
  fetchGenres,
  fetchMovieOrTvCasts,
  fetchMovieOrTvVideos,
} from "../api/movieApi";

// useMoviesSection

export function useMoviesOrTvSection(mediaType, type, page) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    const controller = new AbortController();

    fetchMovieOrTv(mediaType, type, page, controller.signal)
      .then((data) => {
        setData(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [type, page]);

  return { data, error, totalPages, isLoading };
}

export function useHeroMovieSlider(mediaType, id) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchMediaDetails(mediaType, id, controller.signal)
      .then((data) => setMovie(data.results))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return { movie, error };
}

export function useGenres(mediaType) {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchGenres(mediaType, controller.signal);
        setGenres(data.genres);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong!");
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return { genres, error };
}

export function useCasts(mediaType, id) {
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchMovieOrTvCasts(mediaType, id, controller.signal);
        setCasts(data.cast);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong!");
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return { casts, error };
}

export function useMovieOrTvVideos(mediaType,id) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchMovieOrTvVideos(mediaType, id, controller.signal);
        setVideos(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong!");
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id]);

  return { videos, error };
}

// Sara Diamante
// reislin



// 1. Read again your chosen STI Alumni stories. Compare and analyze them. Then, answer the following questions:
// a. What are their positions and responsibilities?
// ●Michael Cunanan – ICT Coordinator and Robotics Trainer; coaches students for robotics competitions and conducts IT workshops.

// ●Felix Emradura – IT Department Supervisor; manages IT support and global projects while teaching in the Alternative Learning System.

// ●Janice Lagundi – IT Software Development Manager; leads software development teams and oversees IT solutions.

// ●Hernan Alar – Database Programmer and STI Alumni President; develops database systems and mentors students.

// ●Josephine Ramos – Delivery Manager; oversees IT system enhancements, user support, and process improvements.

// b. What appears to be the issue of concern, problem, challenge, or opportunity?
// ●Financial struggles and balancing education with work.

// ●Career growth and leadership opportunities.

// ●The importance of continuous learning and adapting to industry trends.

// ●Giving back to the community through education and mentorship.

// c. How is it significant/relevant to their field of specialization?
// ●Their ability to overcome challenges demonstrates resilience, an essential skill in the IT industry.

// ●Their leadership roles show how IT professionals can influence and innovate in various sectors.

// ●The importance of technical expertise, adaptability, and teamwork in achieving career success.



// d. What questions do you want to be answered in your case study?
// 1.How did their education at STI contribute to their career growth?

// 2.What were the key turning points in their journey to success?

// 3.How did they balance education, work, and personal challenges?

// 4.What skills and values helped them overcome obstacles?

// 5.What advice do they have for aspiring IT professionals?
