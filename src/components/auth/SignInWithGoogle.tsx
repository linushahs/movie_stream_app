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
      className="border-2 border-white text-white sm:border-gray-400 rounded-full py-1.5 px-3 sm:p-2  sm:mx-3 xl:py-2 xl:px-3 sm:text-gray-400 transition-colors hover:border-white hover:text-white w-full"
    >
      <div className="sm:flex items-center gap-2 text-md">
        <FcGoogle className="hidden sm:block w-6 h-6" />
        <h2 className="hidden xl:block">Sign in with google</h2>
      </div>
      <h2 className="sm:hidden text-xs">Sign in</h2>
    </button>
  );
}

export default SignInWithGoogle;
