import { useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";

const Navbar = () => {
    const user = useSelector(store=>store.user);
    const navigate = useNavigate();
    const handleSignOut=()=>{
        signOut(auth).then(()=>{
            navigate("/");
        }).catch((error)=>{
            navigate("/error")
        });
    };
  return (
    <div className="absolute w-full px-16 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" className="w-52 " />
        {user && ( <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />

                <button onClick={handleSignOut} className="text-white text-xl font-bold p-5 ">Sign out</button>
       </div>)}
    </div>

  )
}

export default Navbar