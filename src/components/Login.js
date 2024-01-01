import { checkValidPassword, checkValidEmail } from "../utils/validate";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage2, setErrorMessage2] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  // console.log(email, password)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    setErrorMessage(checkValidEmail(email.current.value));
    setErrorMessage2(checkValidPassword(password.current.value));

    if (errorMessage || errorMessage2) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode +"-"+errorMessage)
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
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode +"-"+errorMessage)

      });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg-image"
          className="brightness-50"
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black w-3/12 mt-32 mx-auto left-0 right-0 text-white bg-opacity-80">
        <h1 className="text-3xl font-bold py-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-700 rounded-md "
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
      </form>
    </div>
  );
};

export default Login;
