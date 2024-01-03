import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GPTSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
    const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
    useNowPlayingMovies();
    usePopularMovies();

  return (
    <div>
    <Navbar />
    {showGptSearch ? (
      <GPTSearch />
    ) : (
      <>
        <MainContainer />
        <SecondaryContainer />
      </>
    )}
  </div>
  )
}

export default Browse;