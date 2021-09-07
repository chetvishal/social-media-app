import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { loginUserWithCredentials, initializeUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../notifications/notificationSlice";

export const Login = () => {

    const dispatch = useDispatch();
    const {
        isLoggedIn,
        error
    } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(loginUserWithCredentials({ username, password }))
            .then(async (resp) => {
                if (resp.error === undefined) {
                    await dispatch(getNotifications({ userId: resp.payload.userId, token: resp.payload.accessToken }))
                    await dispatch(initializeUser({ username, token: resp.payload.accessToken }))
                }else console.log("login error")

            })
    }

    const loginAsGuest = async (e) => {
        e.preventDefault();
        await dispatch(loginUserWithCredentials({ username:"test4", password: "12345" }))
            .then(async (resp) => {
                if (resp.error === undefined) {
                    await dispatch(getNotifications({ userId: resp.payload.userId, token: resp.payload.accessToken }))
                    await dispatch(initializeUser({ username, token: resp.payload.accessToken }))
                }else console.log("login error")

            })

        // .then((resp) => {
        //     updateServer('LOGIN', resp)
        //     navigate(state?.from && state?.from !== "/video/:id" ? state.from : '/login')
        // }).catch((err) => {
        //     setErrorText(err.message)
        // })

    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    })

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormHeading}>
                    <div className={styles.login__logo}>
                        <span className={styles.login__logoText}>Social.Street</span>
                    </div>

                    <span className="util-heading-medium" style={{ fontWeight: "500" }}>Sign in</span>

                </div>
                <form onSubmit={handleLogin}>
                    <span className={`util-heading-small ${styles.loginInputText}`}>Username</span>
                    <input type="text" className={styles.loginInput} onChange={e => setUsername(e.target.value)} />
                    <span className={`util-heading-small ${styles.loginInputText}`}>Password</span>
                    <input type="password" className={styles.loginInput} onChange={e => setPassword(e.target.value)} />
                    <button
                        className={`submit-button ${styles.login__Btn}`}
                        style={{ backgroundColor: "black" }}
                        // onClick={handleLogin}
                        type="submit"
                    >
                        LOGIN
                    </button>
                </form>


                <span className="util-heading-small" style={{ color: "red", textAlign: "center" }}>{error}</span>
                <span className={`util-heading-small ${styles.signUpLink}`}>
                    <Link to="/signup" className="nostyle">
                        Don't have an account yet?
                    </Link>
                    
                </span>
                <span className={`util-heading-small ${styles.signUpLink}`}
                    onClick={loginAsGuest}
                >
                        Login as guest
                </span>
            </div>
        </div >
    )
}