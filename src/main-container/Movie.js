import React from "react";

function Movie({ poster, title, rating, releaseDate }) {
  const img_path = `https://image.tmdb.org/t/p/original/${poster}`;

  return (
    <div className="w-[160px] h-auto sm:w-[180px] sm:h-auto relative">
      <img
        src={img_path}
        alt=""
        className="w-full h-full rounded-2xl opacity-50"
      />
      <button className="absolute top-4 right-4 py-0.5 px-2.5 text-xl text-white bg-gray-light/70 rounded-lg">
        +
      </button>
      <div className="details w-full flex flex-col gap-1 absolute bottom-6 text-center">
        <h3 className="text-center text-white">{title}</h3>
        <p className="text-xs text-gray-light">{releaseDate}</p>
        <p className="text-sm mt-1 text-white">
          <span className="bg-yellow px-2 rounded-md text-black font-bold ">
            IMDB
          </span>
          &nbsp; {rating}
        </p>
      </div>
    </div>
  );
}

export default Movie;
