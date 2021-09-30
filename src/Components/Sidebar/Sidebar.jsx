import styles from './Sidebar.module.css';
import { Home2 as HomeIcon, Bell, User, MagnifyingGlass, Logout, FeatherPen, Cross } from '../../Assets/Svg/index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/Auth/authSlice';
import { NewPost } from '../index';
import { useState } from 'react';

const CreatePost = ({ visibility, toggleVisibility }) => {
    return (
        <div
            className={styles.createPost}
            style={{ display: visibility ? "" : "none" }}
        >
            <div className={styles.createPost__newPost}>
                <div><Cross
                    // className={styles.home__sidebarIcon}
                    style={{ width: "1.65rem", height: "1.65rem", padding: "0.3rem 22px", cursor: "pointer", display: "flex" }}
                    onClick={toggleVisibility}
                /></div>
                <NewPost toggleView={toggleVisibility} />
            </div>
        </div>
    )
}

export const Sidebar = () => {

    const { username } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [newPostVisibility, setNewPostVisibility] = useState(false)
    const toggleVisibility = () => {
        setNewPostVisibility(newPostVisibility => !newPostVisibility)
    }

    return (
        <div className={styles.home__sidebar}>
            <div
                className={styles.home__sidebarContainer}
            >
                <Link className="nostyle" to="/">
                    <div className={styles.home__sidebarItem}>
                        <HomeIcon
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Home</span>
                    </div>
                </Link>
                <Link className="nostyle" to="/search">
                    <div className={styles.home__sidebarItem}>
                        <MagnifyingGlass
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Search</span>
                    </div>
                </Link>
                <Link className="nostyle" to="/notifications">
                    <div className={styles.home__sidebarItem}>
                        <Bell
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Notifications</span>

                    </div>
                </Link>
                <Link className="nostyle" to={`/profile/${username}`}>
                    <div className={styles.home__sidebarItem}>
                        <User
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Profile</span>
                    </div>
                </Link>
                {/* <Link className="nostyle" to={`/`}> */}
                <div className={styles.home__sidebarItem} onClick={toggleVisibility}>
                    <FeatherPen
                        className={styles.home__sidebarIcon}
                    />
                    <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Post</span>
                </div>
                {/* </Link> */}
                <div className={styles.home__sidebarItem} onClick={() => {
                    dispatch(logoutUser())
                }}>
                    <Logout
                        className={styles.home__sidebarIcon}
                    />
                    <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Logout</span>
                </div>
            </div>
            <CreatePost visibility={newPostVisibility} toggleVisibility={toggleVisibility} />
        </div>
    )
}