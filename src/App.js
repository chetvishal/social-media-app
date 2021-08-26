import React from 'react';
import { Counter } from './features/counter/Counter';
import { Home, Notifications, ProfilePg, EditProfile, Followers, Following, PostPg } from './features/index'
import { Navbar, Sidebar } from './Components/index';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
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
            <Route path="/profile" element={<ProfilePg />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/following" element={<Following />} />
            <Route path="/profile/followers" element={<Followers />} />
            <Route path="/post/:id" element={<PostPg />} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
