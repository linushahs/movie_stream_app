import { MovieProps } from "../../components/Movie";

function SmallMovieCard({ title, poster, rating, releaseDate }: MovieProps) {
  const img_path = `https://image.tmdb.org/t/p/original/${poster}`;

  return (
    <div className="w-full flex gap-3 mb-4">
      <div className="left min-w-[70px]">
        <img
          src={img_path}
          alt=""
          loading="lazy"
          className="h-[85px] w-full rounded-lg object-cover"
        />
      </div>
      <div className="right h-[85px] flex flex-col justify-between">
        <div>
          <h4 className="text-white text-sm">{title}</h4>
          <p className="text-xs mt-1 text-gray-light">{releaseDate}</p>
        </div>
        <p className="text-sm  text-white">
          <span className="bg-yellow px-1 rounded-md text-black font-bold ">
            IMDB
          </span>
          &nbsp; {rating}
        </p>
      </div>
    </div>
  );
}

export default SmallMovieCard;
