import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieDetailsTrailer } from "../redux/moviesSlice";

const useMovieDetailsTrailer = (id) => {
    const dispatch = useDispatch();
    const movieDetailsTrailer = useSelector(store => store.movies.movieDetailsTrailer);
// console.log(movieDetails)

const getMovieTrailer = async()=>{
    if (movieDetailsTrailer?.id === id) return null;
    try{
        const data = await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US",API_OPTIONS)
    const json = await data.json();
    // console.log(json);
    const filter= json.results.filter((e)=>e.name.includes("Trailer"));
    // console.log(trailer)
    const trailer = filter? filter : json;
    dispatch(addMovieDetailsTrailer(trailer));
    }
    catch(err){
        console.log(err);
    }
}

    useEffect(()=>{
        getMovieTrailer()
    },[])


}

export default useMovieDetailsTrailer