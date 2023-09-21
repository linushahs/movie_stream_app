import { BsBoxArrowUpRight } from "react-icons/bs";

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
      <div className="grid grid-cols-3 gap-3 mt-2">
        {watchProviders?.[arrayName]?.map((p: any) => (
          <a
            key={p.provider_id}
            className="flex gap-2 items-center text-sm bg-dark rounded-md py-1.5 px-3 cursor-pointer"
            href={watchProviders.link}
            target="_blank"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
              alt="logo"
              className="w-9 h-9 rounded-full object-cover"
            />
            {p.provider_name}

            <BsBoxArrowUpRight className="ml-auto text-sm text-gray-dark" />
          </a>
        ))}
      </div>
    </>
  );
}

export default WatchProviderGrid;
