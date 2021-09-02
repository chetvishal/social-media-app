import styles from './Signup.module.css'
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export const Signup = () => {

    const [FormData, setFormData] = useState({ email: "", username: "", password: "" })
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()

    const formChangeHandler = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'EMAIL':
                setFormData(FormData => { return { ...FormData, email: e.target.value } })
                break;
            case 'USERNAME':
                setFormData(FormData => { return { ...FormData, username: e.target.value } })
                break;
            case 'PASSWORD':
                setFormData(FormData => { return { ...FormData, password: e.target.value } })
                break;
            default:
                console.log("default case")
                break;
        }
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        // await signupUser(FormData)
        //     .then(resp => {
        //         loginUserWithCredentials(resp.username, resp.password)
        //     })
        //     .catch(err => {
        //         setErrorText(() => err.message)
        //     })
    }

    return (
        <div className={styles.signup}>
            <div className={styles.signupFormBody}>
                <div className={styles.signupFormHeading}>
                    <span className="util-heading-medium">Sign up</span>
                    <span className="util-heading-small">If you already have an account</span>
                    <span className={`util-heading-small ${styles.loginLink}`}>
                        <Link to="/login" className="nostyle">
                            Log In
                        </Link>
                    </span>

                </div>
                <form className={styles.signupForm} onSubmit={handleSignupSubmit}>
                    <span className={`util-heading-small ${styles.signupInputText}`}>Email</span>
                    <input type="email"
                        className={styles.signupInput}
                        name="EMAIL"
                        // value={FormData.email}
                        onChange={formChangeHandler}
                        required
                    />
                    <span className={`util-heading-small ${styles.signupInputText}`}>Username</span>
                    <input className={styles.signupInput}
                        name="USERNAME"
                        onChange={formChangeHandler}
                    />
                    <span className={`util-heading-small ${styles.signupInputText}`}>Password</span>
                    <input type="password" className={styles.signupInput}
                        name="PASSWORD"
                        onChange={formChangeHandler}
                    />
                    <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        // onClick={handleSignupSubmit}
                        type="submit"
                    >SIGN UP</button>
                </form>
                <span className="util-heading-small" style={{ color: "red", textAlign: "center" }}>{errorText}</span>
            </div>
        </div>
    )
}