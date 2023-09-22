import Movie from "./Movie";

interface TrendingShowsProps {
  trendingShows: any[];
  pagination: {
    startIndex: number;
    endIndex: number;
  };
}

function TrendingShows({ trendingShows, pagination }: TrendingShowsProps) {
  return (
    <>
      {trendingShows?.map((movie: any, idx: number) => {
        if (idx >= pagination.startIndex && idx < pagination.endIndex) {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title || movie.name}
              rating={movie.vote_average.toFixed(1)}
              release_date={movie.release_date || movie.first_air_date}
            />
          );
        }
      })}
    </>
  );
}

export default TrendingShows;
