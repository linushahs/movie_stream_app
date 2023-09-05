import { twMerge } from "tailwind-merge";

interface CastItemProps {
  name: string;
  role: string;
  profile_path: string;
  className?: string;
}

function CastItem({ name, role, profile_path, className }: CastItemProps) {
  return (
    <div className={twMerge("flex items-start gap-2", className)}>
      <div className="w-14 aspect-square h-14 overflow-hidden rounded-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${profile_path}`}
          alt="pic"
          loading="lazy"
          className="w-full bg-gray-dark bg-cover bg-top"
        />
      </div>
      <div className="flex-1 text-white">
        <h2 className="mb-1 text-lg font-medium">
          {role === "Director" ? name : name.substring(0, 13)}
          {role !== "Director" && name.length > 13 && ".."}
        </h2>
        <h4 className="text-gray-light">{role}</h4>
      </div>
    </div>
  );
}

export default CastItem;
