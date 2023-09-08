import { UserProps } from "@/stores/store";

function UserProfile({ user }: { user: UserProps }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <img
        src={user.profile_path || ""}
        alt="pic"
        className="w-11 h-11 rounded-full "
      />
      <span>
        <h2>{user.name}</h2>
        <p className="-mt-1 text-gray-light">{user.email?.split("@")[0]}..</p>
      </span>
    </div>
  );
}

export default UserProfile;
