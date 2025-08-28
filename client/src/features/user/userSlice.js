import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceUtil from "../../utils/axiosInstanceUtil";
import { login, register } from "../auth/authSlice.js";

export const updateFavs = createAsyncThunk("user/updateFavs", async ({ userId, favs }, { rejectWithValue }) => {
    try {
        const res = await axiosInstanceUtil.patch(`user/${userId}/favs`, { favs });
        return res.data.user;
    } catch (err) {
        return rejectWithValue(err?.response?.data?.message || "rejectWithValue - Failure in updating favs");
    }
} );

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        favs: [],
        status: "idle",
        error: null
    },
    reducers: {
        setFavs: (state, action) => {
            state.favs = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateFavs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateFavs.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.favs = action.payload.favs;
                state.status = "success";
            })
            .addCase(updateFavs.rejected, (state, action) => {
                state.status = "failure";
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.favs = action.payload?.favs || [];
            })
            .addCase(register.fulfilled, (state, action) => {
                state.userData = action.payload;
            });
    }
});

export const { setFavs } = userSlice.actions;
export default userSlice.reducer;