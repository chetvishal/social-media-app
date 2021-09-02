import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { extend } from "lodash";
import { apiEndPoint } from "../../Services/Api";

export const getUserData = createAsyncThunk(
    "profile/getUserData",
    async ({ username }) => {
        try {
            console.log("its running apiEndPoint", apiEndPoint())
            const response = await axios.get(`${apiEndPoint()}/user/${username}`)
            return { userData: response.data.user, posts: response.data.posts }
        } catch (error) {
            console.log("error from getUser: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const updateUserData = createAsyncThunk(
    "profile/updateUserData",
    async ({ name, location, website, bio, userId }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user`, {
                _id: userId,
                name,
                location,
                bio,
                links: website
            })
            console.log("response after updating the profile: ", name, location, website, bio, userId)
            return { userData: response.data.user }
        } catch (error) {
            console.log("error from getUser: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const followUser = createAsyncThunk(
    "profile/followUser",
    async ({ userId, toFollowUserId }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user/user/follow`, {
                userId,
                toFollowUserId
            })
            console.log("repsonse after following user: ", response)
            return { userData: response.data.userData }
        } catch (error) {
            console.log("error from getUser: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const unFollowUser = createAsyncThunk(
    "profile/unFollowUser",
    async ({ userId, toUnFollowUserId }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user/user/unfollow`, {
                userId,
                toUnFollowUserId
            })
            console.log("repsonse after unfollowing user: ", response)
            return { userData: response.data.userData }
        } catch (error) {
            console.log("error from unfollow: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);


export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userPosts: [],
        userProfile: {},
        status: "idle",
        error: null,
    },
    reducers: {
        addLike__Profile: (state, action) => {
            if (state.userProfile._id !== undefined) {
                state.userPosts = state.userPosts.map(post => {
                    if (post._id === action.payload.postId) {
                        post.likes.push(action.payload.userId)
                    }
                    return post
                })
            }
        },
        removeLike__Profile: (state, action) => {
            if (state.userProfile._id !== undefined) {
                state.userPosts = state.userPosts.map(post => {
                    if (post._id === action.payload.postId) {
                        post.likes = post.likes.filter(id => id !== action.payload.userId)
                    }
                    return post
                })
            }
        },

    },
    extraReducers: {
        [getUserData.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUserData.fulfilled]: (state, action) => {
            console.log("action payload getUserData: ", action)
            state.userProfile = action.payload.userData
            state.userPosts = action.payload.posts

            state.status = "fulfilled";
        },
        [getUserData.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message
            console.log("getUserrejected: ", action)
        },
        [updateUserData.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateUserData.fulfilled]: (state, action) => {
            state.userProfile = action.payload.userData

            state.status = "fulfilled";
        },
        [updateUserData.rejected]: (state, action) => {
            state.status = "error";
        },
        [followUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [followUser.fulfilled]: (state, action) => {
            state.userProfile = action.payload.userData

            state.status = "fulfilled";
        },
        [followUser.rejected]: (state, action) => {
            state.status = "error";
        },
        [unFollowUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [unFollowUser.fulfilled]: (state, action) => {
            state.userProfile = action.payload.userData

            state.status = "fulfilled";
        },
        [unFollowUser.rejected]: (state, action) => {
            state.status = "error";
        }
    }
});
export const { addLike__Profile, removeLike__Profile } = profileSlice.actions;
export default profileSlice.reducer;