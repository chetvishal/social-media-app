import styles from './Sidebar.module.css';
import { Home2 as HomeIcon, Bell, User, User2, MagnifyingGlass, Logout } from '../../Assets/Svg/index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/Auth/authSlice';

export const Sidebar = () => {

    const { userId, username, isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch();

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
                <div className={styles.home__sidebarItem} onClick={() => {
                    console.log("onClick clicked: ")
                    dispatch(logoutUser())}}>
                    <Logout
                        className={styles.home__sidebarIcon}
                    />
                    <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Logout</span>
                </div>
            </div>
        </div>
    )
}