import { checkValidPassword, checkValidEmail } from "../utils/validate";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BG_URL, AVATAR_URL } from "../utils/constants";
const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage2, setErrorMessage2] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const signInButton = useRef(null);
  // console.log(email, password)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    const emailError = checkValidEmail(email.current.value);
    const passwordError = checkValidPassword(password.current.value);

    setErrorMessage(emailError);
    setErrorMessage2(passwordError);

    if (errorMessage || passwordError) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const handleTestLogin=()=>{
    if (!isSignInForm) {
setIsSignInForm(true)    }
    email.current.value="test@gmail.com";
    password.current.value="Test@123";
    signInButton.current.click();
  }
  return (
    <div>
      <Navbar />
      <div className="absolute">
        <img src={BG_URL} alt="bg" className="brightness-50 h-screen sm:h-full object-cover w-screen" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-11/12 md:w-3/12 mt-32 mx-auto left-0 right-0 text-white bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-700 rounded-md "
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 w-full bg-gray-700 rounded-md "
          ref={email}
        />
        <p className="text-red-500">{errorMessage}</p>

        <input
          type="password"
          placeholder="Password"
          className="my-4 p-4 w-full bg-gray-700 rounded-md"
          ref={password}
        />
        <p className="text-red-500">{errorMessage2}</p>
        <button
        ref={signInButton}
          className="my-6 p-4 bg-red-700 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New User? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
        <p className="my-2 cursor-pointer text-green-400 text-center" onClick={handleTestLogin}>Test Login</p>

      </form>
    </div>
  );
};

export default Login;
