import { UserProps, favoriteMoviesState, userDataState } from "@/stores/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "../ui/use-toast";
import { useSetRecoilState } from "recoil";

function UserProfile({ user }: { user: UserProps }) {
  const auth = getAuth();
  const setFavoriteMovies = useSetRecoilState(favoriteMoviesState);
  const setUserData = useSetRecoilState(userDataState);

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        toast({
          title: "Signout successfull",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.removeItem("user");
    setFavoriteMovies([]);
    setUserData({ uid: "", name: "", email: "", photoURL: "" });
  };

  return (
    <div className=" flex items-center gap-2 text-white">
      <img
        src={user.photoURL}
        alt="pic"
        className="hidden xl:block w-10 h-10 rounded-full "
      />
      <span className="hidden xl:block lg:text-sm">
        <h2>{user.name}</h2>
        <p className=" text-gray-light">{user.email?.split("@")[0]}..</p>
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger className="hidden xl:inline-block xl:ml-[16px] ">
          <BsThreeDotsVertical className="text-xl  cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuTrigger className="xl:hidden inline-block ml-auto">
          <img
            src={user.photoURL}
            alt="pic"
            className="w-9 h-9 rounded-full "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-md">My Account</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-md text-red focus:text-red"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfile;
