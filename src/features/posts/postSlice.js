import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [
      {
        postID: "p1201",
        content: "learning redux",
        likes: 22,
        user: {
          userID: "u1234",
          name: "tanay"
        },
        comments: []
      },
      {
        postID: "p1202",
        content: "it's frustrating to begin",
        likes: 24,
        user: {
          userID: "u1234",
          name: "tanay"
        },
        comments: []
      }
    ]
  },
  reducers: {
    createPost: (state, action) => {
      console.log("its working: ", action)
      state.posts.unshift(action.payload)
    },
  }
});
export const { createPost } = postSlice.actions;
export default postSlice.reducer;