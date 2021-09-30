import React, { useRef } from 'react';
import styles from './navbar.module.css';
import { Hamburger, } from '../../Assets/Svg/index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/Auth/authSlice';

export const Navbar = () => {

    const { username } = useSelector(state => state.auth)

    const check = useRef(null);
    const dispatch = useDispatch();

    const handleCheck = () => check.current.checked = false;

    return (

        <header className={styles.navbar}>
            <nav id={styles.toggleMenu}>

                <input type="checkbox" id={styles.toggleMenu__toggle} ref={check} />

                <label className={styles.toggleMenu__toggleLabel}>
                    <label htmlFor={styles.toggleMenu__toggle} className={styles.toggleMenu__IconContainer}>
                        <span className={styles.toggleMenu__haburgerIcon}>
                            <Hamburger style={{ fill: "#6fbce6" }} />
                        </span>
                    </label>
                    <div className={styles.toggleMenu__links}>
                    </div>
                    <div className={styles.navbar__logo}
                    >
                        <span className={styles.navbar__logoText}>Social.Street</span>
                    </div>
                </label>
                <ul className={styles.navbar__menu}>
                    <li><Link className="nostyle" to="/" onClick={handleCheck}>Home</Link></li>
                    <li><Link className="nostyle" to="/search" onClick={handleCheck}>Search</Link></li>
                    <li><Link className="nostyle" to="/notifications" onClick={handleCheck}>Notifications</Link></li>
                    <li><Link className="nostyle" to={`/profile/${username}`} onClick={handleCheck}>Profile</Link></li>
                    <li><Link className="nostyle" to={`/`} onClick={handleCheck}>Post</Link></li>
                    <li
                        onClick={() => {
                            dispatch(logoutUser())
                        }}
                    >Logout</li>
                </ul>
            </nav>
        </header>
    )
}