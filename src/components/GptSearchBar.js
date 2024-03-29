import { useDispatch, useSelector } from "react-redux";
import { useRef, useState} from "react";
import { API_OPTIONS } from "../utils/constants";
import lang from "../utils/languageConstants";
import { addGptMovieResults, toggleMoviesLoading } from "../redux/gptSlice";
import Shimmer from "./Shimmer";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const moviesLoading = useSelector((store)=>store.gpt.moviesLoading);
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");


  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };
  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) {
      setErrorMessage("Please enter something to search.");
      return;
    }
    setErrorMessage("");

    dispatch(toggleMoviesLoading(true));
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and search for all movies if they exist for the query or suggest some movies based on the query : " +
        searchText.current.value +
        ". strictly only give me names of 5 movies and no other text, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
      const response = await fetch("https://gpt-netflix-backend.vercel.app/api/openai-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText: gptQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const gptResults = await response.json();

      console.log(gptResults.choices?.[0]?.message?.content);
      // Handle the response data from your server
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

      // For each movie I will search TMDB API

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
      );

      dispatch(toggleMoviesLoading(false));
    } catch (error) {
      dispatch(toggleMoviesLoading(false));
      console.error("Error occurred:", error.message);
      // Handle the error
    }
  };

  return (
    <>

    <div className="pt-[45%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 md:bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9 text-sm sm:text-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-2 sm:px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {moviesLoading ?"Loading.." : lang[langKey].search}
        </button>
      </form>

    </div>
    {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
    {moviesLoading && (
      <Shimmer/>
    )}
   </>
  );
};
export default GptSearchBar;
