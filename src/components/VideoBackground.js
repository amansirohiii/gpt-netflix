import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector((state)=>state.movies?.trailerVideo)

    useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
      className=" w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?&autoplay=1&mute=1&controls=0&showinfo=0&loop=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay=1; mute=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

      ></iframe>
    </div>
  );
};

export default VideoBackground;
