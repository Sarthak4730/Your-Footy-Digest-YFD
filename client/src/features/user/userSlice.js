import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceUtil from "../../utils/axiosInstanceUtil";

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
        user: null,
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
                state.status = "loading"
            })
            .addCase(updateFavs.fulfilled, (state, action) => {
                state.user = action.payload,
                state.favs = action.payload.favs
                state.status = "success"
            })
            .addCase(updateFavs.rejected, (state, action) => {
                state.status = "failure",
                state.error = action.payload
            });
    }
});

export const { setFavs } = userSlice.actions;
export default userSlice.reducer;