import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoint } from "../../Services/Api";

export const getPost = createAsyncThunk("posts/getPost", async ({ postId, token }) => {
  try {
    const response = await axios.get(`${apiEndPoint()}/post/${postId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data.post;
  }
  catch (error) {
    console.log("Error fetching post: ", error.message);
    throw new Error(error.message);
  }
})

export const likeHandler = createAsyncThunk("posts/likeHandler", async ({ postId, userId, like, token }) => {
  try {
    const response = await axios.post(`${apiEndPoint()}/post/${postId}/likes`, {
      userId,
      like,

    },
      {
        headers: {
          'Authorization': token
        }
      })
    return { response: response.data, userId };
  } catch (error) {
    throw new Error(error.message)
  }
})

export const commentHandler = createAsyncThunk("posts/commentHandler", async ({ postId, userId, content, token }) => {
  try {
    const response = await axios.post(`${apiEndPoint()}/post/${postId}/comment`, {
      commentUserId: userId,
      commentText: content,

    },
      {
        headers: {
          'Authorization': token
        }
      })
    return { response, userId }
  } catch (error) {
    throw new Error(error.message)
  }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    feed: [],
    currentPost: {
      likes: [
        ""
      ],
      _id: "",
      userId: {
        _id: "",
        username: "",
        name: ""
      },
      content: "",
      username: "",
      comments: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    createPost: (state, action) => {
      state.feed.unshift(action.payload)
    },
    addLike__Post: (state, action) => {
      if (state.currentPost._id !== undefined) {
        state.currentPost.likes.push(action.payload.userId)
      }
    },
    removeLike__Post: (state, action) => {
      if (state.currentPost._id !== undefined) {
        state.currentPost.likes = state.currentPost.likes.filter(id => id !== action.payload.userId)
      }
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPost.fulfilled]: (state, action) => {
      state.currentPost = action.payload;
      state.status = "fulfilled";
    },
    [getPost.rejected]: (state, action) => {
      state.status = "error";
    },
    [likeHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [likeHandler.fulfilled]: (state, action) => {

      state.status = "fulfilled";
    },
    [likeHandler.rejected]: (state, action) => {
      state.status = "error";
    },
    [commentHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [commentHandler.fulfilled]: (state, action) => {
      state.currentPost.comments = action.payload.response.data.savedItem.comments
      state.status = "fulfilled";
    },
    [commentHandler.rejected]: (state, action) => {
      state.status = "error";
    },
  }
});
export const { createPost, addLike__Post, removeLike__Post } = postSlice.actions;
export default postSlice.reducer;