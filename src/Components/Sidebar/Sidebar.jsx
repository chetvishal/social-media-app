import styles from './Sidebar.module.css';
import { Home2 as HomeIcon, Bell, User, MagnifyingGlass, Logout, FeatherPen, Cross } from '../../Assets/Svg/index';
import { NavLink } from 'react-router-dom';
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
    const lastUrlChar = window.location.href.charAt(window.location.href.length - 1)

    const activeLinkStyle = { textShadow: "1px 0 0 black" }
    return (
        <div className={styles.home__sidebar}>
            <div
                className={styles.home__sidebarContainer}
            >
                <NavLink className="nostyle" to="/" style={{ textShadow: lastUrlChar === "/" ? "1px 0 0 black" : "" }}>
                    <div className={styles.home__sidebarItem}>
                        <HomeIcon
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Home</span>
                    </div>
                </NavLink>
                <NavLink className="nostyle" exact to="/search" activeStyle={activeLinkStyle}>
                    <div className={styles.home__sidebarItem}>
                        <MagnifyingGlass
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Search</span>
                    </div>
                </NavLink>
                <NavLink className="nostyle" exact to="/notifications" activeStyle={activeLinkStyle}>
                    <div className={styles.home__sidebarItem}>
                        <Bell
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Notifications</span>

                    </div>
                </NavLink>
                <NavLink className="nostyle" exact to={`/profile/${username}`} activeStyle={activeLinkStyle}>
                    <div className={styles.home__sidebarItem}>
                        <User
                            className={styles.home__sidebarIcon}
                        />
                        <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Profile</span>
                    </div>
                </NavLink>
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