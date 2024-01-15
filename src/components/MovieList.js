import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar scroll-smooth">

        <div className="flex">
          {movies?.map((movie) => (
            <Link onClick={()=>window.top(0,0)} to={"/details?id="+ movie.id} key={movie.id}>
            <MovieCard  posterPath={movie.poster_path} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;