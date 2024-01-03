const Shimmer = () => {
      return (
    <div className="mx-4 my-8  text-white  ">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="mx-6 ">
          <div className="text-lg md:text-3xl h-16 mb-1"></div>
          <div className="flex overflow-x-scroll no-scrollbar scroll-smooth">
            <div className="flex">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="w-44 h-64 mr-4 bg-gray-600 relative overflow-hidden "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20 animate-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
