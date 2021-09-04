import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoint } from "../../Services/Api";

export const getUserSearchResult = createAsyncThunk(
    "search/getUserSearchResult",
    async ({ searchQuery, token }) => {
        try {
            const response = await axios.get(`${apiEndPoint()}/search`, {
                params: { searchQuery },
                headers: {
                    'Authorization': token
                }
            })
            return { searchResult: response.data.users }
        } catch (error) {
            console.log("error from getUserSearchResult: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResult: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: {
        [getUserSearchResult.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUserSearchResult.fulfilled]: (state, action) => {
            console.log("action payload getUserSearchResult: ", action)
            state.searchResult = action.payload.searchResult

            state.status = "fulfilled";
        },
        [getUserSearchResult.rejected]: (state, action) => {
            state.status = "error";
            state.error = action
            console.log("get Notification rejected(getSearchResult): ", action)
        },
    }
});
export const { } = searchSlice.actions;
export default searchSlice.reducer;