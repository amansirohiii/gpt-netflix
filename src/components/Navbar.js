import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../redux/userSlice";
import { useEffect } from "react";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { clearGptMovieResults, toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
const Navbar = () => {
    const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView())
    if(!showGptSearch) dispatch(clearGptMovieResults())

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
    <div className="fixed w-screen px-2 md:px-8 py-2 z-40 flex flex-col md:flex-row justify-between bg-gradient-to-b from-black">
      <img className="w-44 mx-auto md:mx-0" src={LOGO_URL} alt="logo" />
      {user && (

        <div className="flex p-2 justify-between ">
           {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-500 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
           <button onClick={handleGptSearchClick} className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg">{showGptSearch? "Homepage": "GPT Search"}</button>

            <img className="hidden md:block w-12 h-5" alt="usericon" src={user?.photoURL} />

            <button
              onClick={handleSignOut}
              className="text-white text-xl font-bold  "
            >
              Sign out
            </button>
          </div>

      )}
    </div>
  );
};

export default Navbar;
