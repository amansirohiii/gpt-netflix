import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isSignInForm: true
    },
    reducers: {
        setIsSignInForm: (state, action)=>{
            state.isSignInForm=action.payload;
        }
    } });

export const {setIsSignInForm}=appSlice.actions;
export default appSlice.reducer;
