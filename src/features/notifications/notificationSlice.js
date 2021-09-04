import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoint } from "../../Services/Api";

export const getNotifications = createAsyncThunk(
    "notification/getNotifications",
    async ({ userId, token }) => {
        try {
            const response = await axios.get(`${apiEndPoint()}/notification/${userId}`, {
                // data: { userId },
                params: { userId },
                headers: {
                    'Authorization': token
                }
            })
            console.log("response after getting notification: ", response, "userId", userId)
            return { notifications: response.data.notifications }
        } catch (error) {
            console.log("error from getNotifications: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: {
        [getNotifications.pending]: (state, action) => {
            state.status = "loading";
        },
        [getNotifications.fulfilled]: (state, action) => {
            console.log("action payload getNotifications: ", action)
            state.notifications = action.payload.notifications

            state.status = "fulfilled";
        },
        [getNotifications.rejected]: (state, action) => {
            state.status = "error";
            state.error = action
            console.log("get Notification rejected: ", action)
        },
    }
});
export const { } = notificationSlice.actions;
export default notificationSlice.reducer;