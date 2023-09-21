import WatchProviderGrid from "./WatchProviderItem";

interface WatchProviderProps {
  watchProviders: any;
}

function WatchProvider({ watchProviders }: WatchProviderProps) {
  return (
    <>
      {watchProviders?.flatrate && (
        <WatchProviderGrid
          title="Stream"
          arrayName="flatrate"
          watchProviders={watchProviders}
        />
      )}

      {watchProviders?.free && (
        <WatchProviderGrid
          title="Free"
          arrayName="free"
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

export default WatchProvider;
