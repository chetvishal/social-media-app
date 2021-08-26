import styles from './Home.module.css';
import { Home2 as HomeIcon, Bell, User, User2, MagnifyingGlass } from '../../../Assets/Svg/index';
import { Feed } from '../Feed/Feed';
import { NewPost } from '../../../Components';
import { Link } from 'react-router-dom';

export const Home = ({ searchKeyword }) => {

    return (
        <div className={styles.home}>
            {/* <div className={styles.home__body}> */}
                {/* <div className={styles.home__sidebar}>
                    <div
                        className={styles.home__sidebarContainer}
                    >
                        <div className={styles.home__sidebarItem}>
                            <HomeIcon
                                className={styles.home__sidebarIcon}
                            />
                            <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Home</span>
                        </div>
                        <div className={styles.home__sidebarItem}>
                            <MagnifyingGlass
                                className={styles.home__sidebarIcon}
                            />
                            <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Search</span>
                        </div>

                        <Link className="nostyle" to="/notifications">
                            <div className={styles.home__sidebarItem}>
                                <Bell
                                    className={styles.home__sidebarIcon}
                                />
                                <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Notifications</span>

                            </div>
                        </Link>
                        <div className={styles.home__sidebarItem}>
                            <User
                                className={styles.home__sidebarIcon}
                            />
                            <span className={`util-heading-medium ${styles.home__sidebarItemText}`}>Profile</span>
                        </div>
                    </div>
                </div> */}
                {/* <div className={styles.home__feed}> */}
                    <NewPost />
                    <Feed />
                {/* </div> */}
            {/* </div> */}
        </div>
    )
}