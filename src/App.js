import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import { Home, Notifications, ProfilePg, EditProfile, Followers, Following, PostPg, Login, SearchPg, Signup } from './features/index'
import { Navbar, Sidebar } from './Components/index';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './features/Auth/authSlice';
import { getNotifications } from './features/notifications/notificationSlice'

function App() {

  const { username, userId } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("app.js runs", username)
    dispatch(initializeUser({ username }))
    dispatch(getNotifications({ userId }))
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <div className="App">
        <Navbar />
        <div className={styles.App__body}>
          <div className={styles.App__sidebar}>
            <Sidebar />
          </div>
          <div className={styles.App__content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile/:username" element={<ProfilePg />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/:username/following" element={<Following />} />
              <Route path="/profile/:username/followers" element={<Followers />} />
              <Route path="/post/:postId" element={<PostPg />} />
              <Route path="/search" element={<SearchPg />} />
            </Routes>
          </div>
        </div>
      </div>
    </Routes>
  );
}

export default App;
