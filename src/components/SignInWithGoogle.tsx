import { userDataState } from "@/stores/store";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";

function SignInWithGoogle() {
  const setUserData = useSetRecoilState(userDataState);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL, uid } = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (displayName && token && email && photoURL) {
          const user = {
            uid,
            name: displayName,
            email,
            photoURL,
            accessToken: token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setUserData({ uid, name: displayName, email, photoURL });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      onClick={handleSignIn}
      className="border-2 border-white text-white text-xs sm:text-md sm:border-gray-400 rounded-full py-1 sm:py-2 px-3 sm:mx-3 flex items-center gap-1 sm:gap-3 sm:text-gray-400 transition-colors hover:border-white hover:text-white w-full"
    >
      <FcGoogle className="w-6 h-6 hidden sm:block" /> Sign in
      <span className="hidden sm:inline-block -ml-2">with google</span>
    </button>
  );
}

export default SignInWithGoogle;
