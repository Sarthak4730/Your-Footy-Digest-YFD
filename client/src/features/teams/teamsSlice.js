import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceUtil from "../../utils/axiosInstanceUtil";

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async (data, thunkAPI) => {
    try {
        const res = await axiosInstanceUtil.get("/teams");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response?.data || err?.message || "Some Error");
    }
});

const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTeams.pending, state => {
                state.loading = true;
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default teamsSlice.reducer;