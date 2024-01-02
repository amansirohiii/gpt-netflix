import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();

  return (
    <div>
        <Navbar/>
        <MainContainer/>
        <SecondaryContainer/>
    </div>
  )
}

export default Browse;