import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../features/posts/postSlice';
import authSlice from '../features/Auth/authSlice';
import feedSlice from '../features/Feed/feedSlice';
import profileSlice from '../features/Profile/profileSlice';
import notificationSlice from '../features/notifications/notificationSlice';
import searchSlice from '../features/Search/searchSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice,
    auth: authSlice,
    feed: feedSlice,
    profile: profileSlice,
    notification: notificationSlice,
    search: searchSlice
  },
});
