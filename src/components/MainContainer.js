import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";
const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;
// console.log(movies)
  const mainMovie = movies[0];
//  console.log(movies[0])

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} id={id} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;