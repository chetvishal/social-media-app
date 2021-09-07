import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoint } from "../../Services/Api";

export const getUserData = createAsyncThunk(
    "profile/getUserData",
    async ({ username, token }) => {
        try {
            const response = await axios.get(`${apiEndPoint()}/user/${username}`, {
                headers: {
                    'Authorization': token
                }
            })
            return { userData: response.data.user, posts: response.data.posts }
        } catch (error) {
            console.log("error from getUser: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const updateUserData = createAsyncThunk(
    "profile/updateUserData",
    async ({ name, location, website, bio, userId, token }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user`, {
                _id: userId,
                name,
                location,
                bio,
                links: website,
            },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            )
            return { userData: response.data.user }
        } catch (error) {
            console.log("error from getUser: ", error.message)
            throw new Error(error.message)
        }
    }
);

export const followUser = createAsyncThunk(
    "profile/followUser",
    async ({ userId, toFollowUserId, token }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user/user/follow`, {
                userId,
                toFollowUserId,
            },
                {
                    headers: {
                        'Authorization': token
                    }
                }

            )
            return { userData: response.data.userData }
        } catch (error) {
            console.log("error from getUser: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const unFollowUser = createAsyncThunk(
    "profile/unFollowUser",
    async ({ userId, toUnFollowUserId, token }) => {
        try {
            const response = await axios.post(`${apiEndPoint()}/user/user/unfollow`, {
                userId,
                toUnFollowUserId,

            },
                {
                    headers: {
                        'Authorization': token
                    }
                })
            return { userData: response.data.userData }
        } catch (error) {
            console.log("error from unfollow: ", error.response)
            throw new Error(error.response.data.message)
        }
    }
);

export const uploadProfilePic = createAsyncThunk("profile/uploadProfilePic",
    async ({ encodedImage, token, userId }) => {
        try {
            const uploadImageResponse = await axios.post(`${apiEndPoint()}/user/profilepic`, {
                userId,
                encodedImage
            }, {
                headers: {
                    'Authorization': token
                }
            })
            return uploadImageResponse
        } catch (error) {
            console.error(error);
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
            console.log("error updating data: ", action)
            state.error = action.error.message
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
        },
        [uploadProfilePic.pending]: (state, action) => {
            state.status = "loading";
        },
        [uploadProfilePic.fulfilled]: (state, action) => {
            state.status = "fulfilled";
        },
        [uploadProfilePic.rejected]: (state, action) => {
            state.status = "error";
        }
    }
});
export const { addLike__Profile, removeLike__Profile } = profileSlice.actions;
export default profileSlice.reducer;