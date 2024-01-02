import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO_URL } from "../utils/constants";

const Navbar = () => {
    const user = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe= onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
                addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })

                ); navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate("/");
          }
        });
        return ()=> unsubscribe();
      }, []);

    const handleSignOut=()=>{
        signOut(auth).then(()=>{
        }).catch((error)=>{
            navigate("/error")
        });
    };
  return (
    <div className="absolute w-full px-16 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img src={LOGO_URL} alt="logo" className="w-52 " />
        {user && ( <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />

                <button onClick={handleSignOut} className="text-white text-xl font-bold p-5 ">Sign out</button>
       </div>)}
    </div>

  )
}

export default Navbar