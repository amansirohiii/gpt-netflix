import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../redux/userSlice";
import { useEffect } from "react";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
const Navbar = () => {
    const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-full px-16 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img src={LOGO_URL} alt="logo" className="w-52 " />
      {user && (

        <div className="flex p-2 justify-between ">
           {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-300 text-black"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
           <button onClick={handleGptSearchClick} className="py-2 px-4 mx-4 my-4 bg-purple-800 text-white rounded-lg">{showGptSearch? "Homepage": "GPT Search"}</button>

            <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />

            <button
              onClick={handleSignOut}
              className="text-white text-xl font-bold p-5 "
            >
              Sign out
            </button>
          </div>

      )}
    </div>
  );
};

export default Navbar;
