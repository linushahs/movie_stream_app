import { BsBoxArrowUpRight } from "react-icons/bs";
import WatchProviderItem from "../WatchProviderItem";
import WatchProviderGrid from "../WatchProviderItem";

interface WatchProviderProps {
  watchProviders: any;
}

function MovieWatchProvider({ watchProviders }: WatchProviderProps) {
  return (
    <>
      {watchProviders?.flatrate && (
        <WatchProviderGrid
          title="Stream"
          arrayName="flatrate"
          watchProviders={watchProviders}
        />
      )}

      {watchProviders?.buy && (
        <WatchProviderGrid
          title="Buy"
          arrayName="buy"
          watchProviders={watchProviders}
        />
      )}

      {watchProviders?.rent && (
        <WatchProviderGrid
          title="Rent"
          arrayName="rent"
          watchProviders={watchProviders}
        />
      )}
    </>
  );
}

export default MovieWatchProvider;
