import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
    useNowPlayingMovies();

  return (
    <div>
        <Navbar/>
        <MainContainer/>
        <SecondaryContainer/>
    </div>
  )
}

export default Browse;