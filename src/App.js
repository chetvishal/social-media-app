import React, { useEffect, useState } from 'react';
import { Home, Notifications, ProfilePg, EditProfile, Followers, Following, PostPg, Login, SearchPg, Signup } from './features/index'
import { Navbar, Sidebar, NoRoute } from './Components/index';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './features/Auth/authSlice';
import { getNotifications } from './features/notifications/notificationSlice';
import { PrivateRoute } from './Services/PrivateRoute'

function App() {

  const { username, userId, isLoggedIn, userToken } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  const [hideMenu, setHideMenu] = useState(false)

  const toggleHideMenu = () => {
    setHideMenu(() => true)
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(initializeUser({ username, token: userToken }))
      dispatch(getNotifications({ userId, token: userToken }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <div className="App">
        <Navbar setHideMenu={setHideMenu} hideMenu={hideMenu}/>
        <div className={styles.App__body} onClick={toggleHideMenu}>
          <div className={styles.App__sidebar}>
            <Sidebar />
          </div>
          <div className={styles.App__content} >
            <Routes>
              <PrivateRoute path="/" element={<Home />} />
              <PrivateRoute path="/notifications" element={<Notifications />} />
              <PrivateRoute path="/profile/:username" element={<ProfilePg />} />
              <PrivateRoute path="/profile/edit" element={<EditProfile />} />
              <PrivateRoute path="/profile/:username/following" element={<Following />} />
              <PrivateRoute path="/profile/:username/followers" element={<Followers />} />
              <PrivateRoute path="/post/:postId" element={<PostPg />} />
              <PrivateRoute path="/search" element={<SearchPg />} />
              <Route path="*" element={<NoRoute />} />
            </Routes>
          </div>
        </div>
      </div>
    </Routes>
  );
}

export default App;
