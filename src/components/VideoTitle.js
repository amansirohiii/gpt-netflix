const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-48 px-12">
    <h1 className="text-5xl py-4 font-bold">{title}</h1>
    <p className="py-6 text-lg w-1/2">{overview}</p>
    <div>
        <button className="px-12 p-4 bg-gray-500 text-lg text-white bg-opacity-50 rounded-md">Play</button>
        <button className="mx-2 px-12 p-4 bg-gray-500 text-lg text-white bg-opacity-50 rounded-md">More Info</button>
    </div>
  </div>
  )
};

export default VideoTitle;
