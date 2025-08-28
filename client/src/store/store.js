import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import teamsReducer from "../features/teams/teamsSlice.js";
import userReducer from "../features/user/userSlice.js";

// Load store-data from localStorage
const loadState = () => {
    try {
        const gotItem = JSON.parse(localStorage.getItem("reduxState"));
        if(gotItem === null) return undefined;
        return JSON.parse(gotItem);
    } catch (err) {
        return undefined;
    }
}

// Save store-data to localStorage
const saveState = (state) => {
    const authAndUser = JSON.stringify({
        auth: state.auth,
        user: state.user,
    });
    localStorage.setItem("reduxState", authAndUser);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        teams: teamsReducer,
        user: userReducer,
    },
    preloadedState: loadState(),
    devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;