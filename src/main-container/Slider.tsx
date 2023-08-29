interface SliderProps {
  movie: any;
}

export default function Slider({ movie }: SliderProps) {
  return (
    <div className="latest relative w-full h-auto bg-cover rounded-xl">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt=""
        className="w-full h-[500px] rounded-3xl opacity-70 object-cover"
      />
      <div className="details text-white absolute bottom-0 p-8 flex flex-col justify-end h-full">
        <h1 className="uppercase text-xl">{movie.name || movie.title}</h1>
        <p className="uppercase text-gray-light text-sm my-1">
          Action, adventure, sci-fi{" "}
        </p>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 rounded-lg bg-red">Watch</button>
          <button className="bg-gray-light/70 px-3 py-1 text-lg rounded-lg">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
