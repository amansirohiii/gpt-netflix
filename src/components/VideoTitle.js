const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" aspect-video pt-52 px-12 absolute bg-gradient-to-r from-black text-white">
    <h1 className="text-5xl py-4 font-bold">{title}</h1>
    <p className="py-6 text-lg w-1/2">{overview}</p>
    <div>
        <button className="px-12 p-4 bg-white text-lg text-black hover:bg-opacity-80 rounded-md font-bold">Play</button>
        <button className="mx-2 px-12 p-4 bg-white text-lg text-black hover:bg-opacity-80 rounded-md font-bold">More Info</button>
    </div>
  </div>
  )
};

export default VideoTitle;
