import Navbar from "./Navbar";
import { useState } from "react";

const Login = () => {
    const[isSignInForm, setIsSignInForm]= useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick=()=>{
        
    }
  return (
    <div>
       <Navbar/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg-image" className="brightness-50" />
      </div>
        <form className="absolute p-12 bg-black w-3/12 mt-32 mx-auto left-0 right-0 text-white bg-opacity-80">
            <h1 className="text-3xl font-bold py-6">{isSignInForm? "Sign In":"Sign Up"}</h1>
            {!isSignInForm && <input type="text"  placeholder="Full Name" className="my-2 p-4 w-full bg-gray-700 rounded-md "/>}
            <input type="text"  placeholder="Email Address" className="my-2 p-4 w-full bg-gray-700 rounded-md "/>
            <input type="password" placeholder="Password" className="my-2 p-4 w-full bg-gray-700 rounded-md"/>
            <button className="my-6 p-4 bg-red-700 w-full rounded-md" onClick={handleButtonClick} >{isSignInForm? "Sign In":"Sign Up"}</button>
            <p className="my-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"New User? Sign Up Now.":"Already registered? Sign In Now."}</p>
        </form>
    </div>
  )
}

export default Login;