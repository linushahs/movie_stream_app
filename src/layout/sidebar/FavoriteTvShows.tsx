import SmallMovieCard from "./SmallMovieCard";

function FavoriteTvShows({ tvShows }: { tvShows: any }) {
  return (
    <>
      {tvShows[0] ? (
        tvShows.map((tvShow: any, idx: number) => {
          if (idx < 3) {
            return (
              <SmallMovieCard
                key={tvShow.id}
                id={tvShow.id}
                title={tvShow.title}
                poster_path={tvShow.poster_path}
                rating={tvShow.vote_average}
                release_date={tvShow.release_date}
              />
            );
          }
        })
      ) : (
        <h3 className="text-gray-dark mb-4">No tv shows added</h3>
      )}
    </>
  );
}

export default FavoriteTvShows;
