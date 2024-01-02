import useNowPlayingMovies from "../hooks/useNowPlayMovies";
import Navbar from "./Navbar";

const Browse = () => {
    useNowPlayingMovies();

  return (
    <div>
        <Navbar/>
    </div>
  )
}

export default Browse;