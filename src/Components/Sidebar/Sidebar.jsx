import styles from './Sidebar.module.css';
import { Home2 as HomeIcon, Bell, User, User2, MagnifyingGlass } from '../../Assets/Svg/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Sidebar = () => {

    const { userId, username } = useSelector(state => state.auth)

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
            </div>
        </div>
    )
}