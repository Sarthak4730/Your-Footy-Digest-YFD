import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/register", data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/login", data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        return res.data.user;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

const user = JSON.parse( localStorage.getItem("user") );

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null,
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;