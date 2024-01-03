import userReducer from "./userSlice"
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import configReducer from "./configSlice";
import gptReducer from "./gptSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        config: configReducer,
        gpt: gptReducer,

    },
})
export default appStore;