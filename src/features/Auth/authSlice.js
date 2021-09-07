import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../Services/Auth";
// import { getUser } from "../../services/profile";
// import { followUserById } from "../../services/auth";
import { apiEndPoint } from "../../Services/Api";

export const loginUserWithCredentials = createAsyncThunk(
    "auth/loginUserWithCredentials",
    async ({ username, password }) => {
        try {

            const login = await loginService(username, password)

            if (login.data.success) {

                const { accessToken, userId, username: user_name, name } = login.data
                return { accessToken, userId, user_name, name }
            }
            throw new Error(login.data.message);
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const createNewAccount = createAsyncThunk(
    "auth/createNewAccount",
    async ({ username, password, name, email }) => {
        try {
            const login = await signupService(username, password, name, email)

            if (login.data.success) {
                // alert("successfully created account")
                return login.data
            }
            throw new Error(login.data.message);
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const initializeUser = createAsyncThunk(
    "auth/initializeUser",
    async ({ username, token }) => {
        try {
            const response = await axios.get(`${apiEndPoint()}/user/${username}`, {
                headers: {
                    'Authorization': token
                }
            })
            return { userData: response.data.user, posts: response.data.posts }
        } catch (error) {
            throw new Error(error.response.data.message)
            // return error.response.data
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: JSON.parse(localStorage?.getItem("userData"))?.userToken
            ? "fulfilled"
            : "idle",
        userToken: JSON.parse(localStorage?.getItem("userData"))?.userToken || null,
        userId: JSON.parse(localStorage?.getItem("userData"))?.userId || null,
        username: JSON.parse(localStorage?.getItem("userData"))?.username || null,
        isLoggedIn: JSON.parse(localStorage?.getItem("userData"))?.isLoggedIn || false,
        user: {
            followers: [],
            following: [],
            _id: "",
            username: "",
            name: "",
            email: "",
            bio: "",
            links: "",
            location: ""
        },
        error: null,
    },
    reducers: {
        logoutUser: () => {
            localStorage.removeItem("userData");
            return {
                status: "idle",
                userToken: null,
                userId: null,
                username: null,
                isLoggedIn: false,
                user: {
                    followers: [],
                    following: [],
                    _id: "",
                    username: "",
                    name: "",
                    email: "",
                    bio: "",
                    links: "",
                    location: ""
                },
            };
        },
        resetAuthStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },
        followUser_auth: (state, action) => {
            state?.user?.following.push(action.payload)
        },
        unfollowUser_auth: (state, action) => {
            state.user.following = state.user.following.filter(item => item._id !== action.payload._id)
        },
    },
    extraReducers: {
        [loginUserWithCredentials.pending]: (state) => {
            state.status = "loading";
        },
        [loginUserWithCredentials.fulfilled]: (state, action) => {
            const { accessToken, userId, user_name } = action.payload;
            state.userToken = accessToken;
            state.userId = userId;
            state.isLoggedIn = true;
            state.username = user_name;

            localStorage.setItem("userData", JSON.stringify({
                isLoggedIn: true,
                userToken: accessToken,
                userId,
                username: user_name
            }))
            state.status = "fulfilled";
        },
        [loginUserWithCredentials.rejected]: (state, action) => {
            state.status = "error";
            state.isLoggedIn = false;
            state.error = action.error.message;
        },
        [initializeUser.pending]: (state) => {
            state.status = "loading";
        },
        [initializeUser.fulfilled]: (state, action) => {
            state.user = action.payload.userData
            state.status = "fulfilled";
        },
        [initializeUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },
        [createNewAccount.pending]: (state) => {
            state.status = "loading";
        },
        [createNewAccount.fulfilled]: (state, action) => {
            // state.user = action.payload.userData
            state.status = "fulfilled";
        },
        [createNewAccount.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },
    },
});
export const { followUser_auth, unfollowUser_auth, logoutUser } = authSlice.actions;
export default authSlice.reducer;