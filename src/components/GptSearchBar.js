import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {API_OPTIONS} from "../utils/constants"
import lang from "../utils/languageConstants";
import { addGptMovieResults } from "../redux/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

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
      try {
        const response = await fetch("https://gpt-netflix-backend.vercel.app/api/openai-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchText: searchText.current.value }),
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


      } catch (error) {
        console.error("Error occurred:", error.message);
        // Handle the error
      }


    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
          <form
            className="w-full md:w-1/2 bg-black grid grid-cols-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
            ref={searchText}
            type="text"
              className=" p-4 m-4 col-span-9"
              placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button
              className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}

            >
              {lang[langKey].search}
            </button>
          </form>
        </div>
      );
    };
    export default GptSearchBar;