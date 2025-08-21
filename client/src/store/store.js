import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import teamsReducer from "../features/teams/teamsSlice.js";
import userReducer from "../features/user/userSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        teams: teamsReducer,
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;