import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { extend } from "lodash";
import { apiEndPoint } from "../../Services/Api";

export const getUserData = createAsyncThunk(
    "profile/getUserData",
    async ({ username, token }) => {
        try {
            console.log("its running apiEndPoint", apiEndPoint())
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
            console.log("response after updating the profile: ", name, location, website, bio, userId)
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
            console.log("repsonse after unfollowing user: ", response)
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
            console.log("repsonse after uploading pic: ", uploadImageResponse)
            return uploadImageResponse

            // fetch('/api/upload', {
            //     method: 'POST',
            //     body: JSON.stringify({ data: base64EncodedImage }),
            //     headers: { 'Content-Type': 'application/json' },
            // });

        } catch (error) {
            console.error(error);
            throw new Error(error.response.data.message)
        }
    }
);





// async (base64EncodedImage) => {
//     try {
//         await fetch('/api/upload', {
//             method: 'POST',
//             body: JSON.stringify({ data: base64EncodedImage }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         setFileInputState('');
//         setPreviewSource('');
//         setSuccessMsg('Image uploaded successfully');
//     } catch (err) {
//         console.error(err);
//         setErrMsg('Something went wrong!');
//     }
// };


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
            console.log("successfully uploaded profile picture")
            state.status = "fulfilled";
        },
        [uploadProfilePic.rejected]: (state, action) => {
            state.status = "error";
        }
    }
});
export const { addLike__Profile, removeLike__Profile } = profileSlice.actions;
export default profileSlice.reducer;