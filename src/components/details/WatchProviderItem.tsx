function WatchProviderGrid({
  title,
  watchProviders,
  arrayName,
}: {
  title: string;
  watchProviders: any;
  arrayName: "buy" | "rent" | "free" | "flatrate";
}) {
  return (
    <>
      <h2 className="mt-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 overflow-hidden">
        {watchProviders?.[arrayName]?.map((p: any) => (
          <a
            key={p.provider_id}
            className="relative sm:static flex gap-2 items-center text-sm bg-dark rounded-md h-[50px] py-1.5 px-3 cursor-pointer overflow-clip"
            href={watchProviders.link}
            target="_blank"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
              alt="logo"
              className=" w-8 h-8 rounded-full "
            />
            <span className="z-10">{p.provider_name}</span>
          </a>
        ))}
      </div>
    </>
  );
}

export default WatchProviderGrid;
