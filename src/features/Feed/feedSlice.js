import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoint } from "../../Services/Api";

export const loadFeed = createAsyncThunk("feed/loadFeed", async ({ userId, token }) => {
    try {
        const response = await axios.post(
            `${apiEndPoint()}/post/feed`,
            {
                userId
            },
            {
                headers: {
                    'Authorization': token
                }
            });
        return response.data.posts;
    } catch (error) {
        console.log("error fetching feed: ", error.message)
        throw new Error(error.message);
    }
});

export const createNewPost = createAsyncThunk("feed/createNewPost", async ({ userId, content, username, token }) => {
    try {
        const response = await axios.post(
            `${apiEndPoint()}/post`,
            {
                userId,
                content,
                username,
               
            },
            {
                headers: {
                    'Authorization': token
                }
            }
        );
        return response.data.post;
    } catch (error) {
        console.log("error fetching feed: ", error.message)
        throw new Error(error.message);
    }
});

export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feed: [],
        currentPost: {},
        status: "idle",
        error: null,
    },
    reducers: {
        createPost: (state, action) => {
            state.feed.unshift(action.payload)
        },
        addLike__Feed: (state, action) => {
            state.feed = state.feed.map(post => {
                if (post._id === action.payload.postId) {
                    post.likes.push(action.payload.userId)
                }
                return post
            })
        },
        removeLike__Feed: (state, action) => {
            state.feed = state.feed.map(post => {
                if (post._id === action.payload.postId) {
                    post.likes = post.likes.filter(id => id !== action.payload.userId)
                }
                return post
            })
        }
    },
    extraReducers: {
        [loadFeed.pending]: (state) => {
            state.status = "loading";
        },
        [loadFeed.fulfilled]: (state, action) => {
            const feed = action.payload;
            state.status = "fulfilled"
            state.feed = feed;
        },
        [loadFeed.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message
        },
        [createNewPost.pending]: (state) => {
            state.status = "loading";
        },
        [createNewPost.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.feed.unshift(action.payload)
        },
        [createNewPost.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message
        },
    }
});
export const { createPost, addLike__Feed, removeLike__Feed } = feedSlice.actions;
export default feedSlice.reducer;