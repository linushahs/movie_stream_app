import { loggedInUserState } from "@/stores/store";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";

function SignInWithGoogle() {
  const setUser = useSetRecoilState(loggedInUserState);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          setUser({
            name: user.displayName,
            email: user.email,
            profile_path: user.photoURL,
          });
        }
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      onClick={handleSignIn}
      className="border border-gray-400 rounded-full py-2 px-3 flex items-center gap-3 text-gray-400 transition-colors hover:border-white hover:text-white w-full"
    >
      <FcGoogle className="w-6 h-6" /> Sign in with google
    </button>
  );
}

export default SignInWithGoogle;
