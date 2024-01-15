import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMovieDetails } from "../redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useMovieDetails = (id) => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movies.movieDetails);
  // console.log(movieDetails)

  const getMovieDetails = async () => {
    if (movieDetails?.id === id) return null;
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addMovieDetails(json));
    // console.log(json);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);
};

export default useMovieDetails;
