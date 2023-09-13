import { twMerge } from "tailwind-merge";

interface CastItemProps {
  name: string;
  role: string;
  profile_path: string;
  clip_string?: boolean;
  className?: string;
}

function CastItem({
  name,
  role,
  profile_path,
  clip_string = false,
  className,
}: CastItemProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col sm:flex-row sm:items-start gap-2",
        className
      )}
    >
      <div className="w-14 aspect-square h-14 overflow-hidden rounded-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${profile_path}`}
          alt="pic"
          loading="lazy"
          className="w-full bg-gray-dark bg-cover bg-top"
        />
      </div>
      <div className="flex-1 text-white sm:text-left">
        <h2 className="mb-1 text-sm sm:text-base font-medium">
          {clip_string ? name.substring(0, 12) : name}
          {clip_string && name.length > 12 && ".."}
        </h2>
        <h4 className="text-sm sm:text-md text-gray-light">{role}</h4>
      </div>
    </div>
  );
}

export default CastItem;
