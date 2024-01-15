import Navbar from "./Navbar";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieDetailsTrailer from "../hooks/useMovieDetailsTrailer";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const MovieDetailsPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    useMovieDetails(params.get("id"));
    useMovieDetailsTrailer(params.get("id"));
    const movieDetails = useSelector(store=>store.movies.movieDetails);
    const movieDetailsTrailer = useSelector(store=>store.movies.movieDetailsTrailer);
    // console.log(movieDetails)

const handleGoBack=()=>{
    navigate("/browse")
}
if(!movieDetails || !movieDetailsTrailer) return null;
 return (
    <div>
      <Navbar />
      <div className="sm:pt-32 pt-40 bg-black text-white min-h-[120vh]">
      <button
          onClick={handleGoBack}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg mb-4 ml-8"
        >
          <i className="fa-solid fa-arrow-left" />
        </button>

        <h1 className="text-3xl font-bold text-center sm:mb-10">{movieDetails?.original_title}</h1>
        <div className="sm:flex">
        <iframe className="mb-4 aspect-video w-full sm:mx-10 sm:w-full" src={"https://www.youtube.com/embed/"+movieDetailsTrailer[0]?.key} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
        <div className="flex flex-col">
            <h2 className="font-bold text-xl px-2">Description:</h2>
            <p className="p-2 sm:w-10/12">{movieDetails?.overview}</p>

        <div>

        <h2 className="font-bold text-xl px-2 text-purple-400">Status:</h2>
        <p className="p-2 sm:w-10/12">{movieDetails?.status}</p>

        <h2 className="font-bold text-xl px-2 text-purple-400">Runtime:</h2>
        <p className="p-2 sm:w-10/12">{(movieDetails?.runtime/60).toFixed(2) + " hr"}</p>


        <h2 className="font-bold text-xl px-2 text-purple-400">Ratings (Count):</h2>
        <p className="p-2 sm:w-10/12">{movieDetails?.vote_average} ({movieDetails?.vote_count})</p>


        </div>
        </div>
        </div>


      </div>
    </div>
  );
};

export default MovieDetailsPage;
