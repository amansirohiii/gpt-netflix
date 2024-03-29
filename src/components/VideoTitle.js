import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview, id }) => {
  return (
    <div className=" aspect-video pt-[40%] md:pt-[20%] px-12 absolute bg-gradient-to-r from-black text-white">
    <h1 className="text-2xl md:text-5xl py-1 md:py-3 font-bold">{title}</h1>
    <p className="hidden md:inline-block py-2 md:py-6 text-lg w-1/2 line-clamp-2">{overview}</p>
    <div>
        <Link to={"/details?id="+id}>
        <button className="hidden md:inline-block px-5 p-2 md:px-12 md:p-4 bg-white text-lg text-black hover:bg-opacity-80 rounded-md font-bold">Play</button>
        <button className="hidden md:inline-block mx-2 px-12 p-4 bg-white text-lg text-black hover:bg-opacity-80 rounded-md font-bold">More Info</button>
        </Link>
    </div>
  </div>
  );
};

export default VideoTitle;
