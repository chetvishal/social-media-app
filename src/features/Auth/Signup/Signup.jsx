import styles from './Signup.module.css'
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewAccount, loginUserWithCredentials } from '../authSlice';

export const Signup = () => {

    const [FormData, setFormData] = useState({ email: "", username: "", password: "", name: "" })
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, isLoggedIn } = useSelector(state => state.auth)

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
            case 'NAME':
                setFormData(FormData => { return { ...FormData, name: e.target.value } })
                break;
            default:
                console.log("default case")
                break;
        }
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        console.log("handle Signup");
        await dispatch(createNewAccount({
            username: FormData.username,
            password: FormData.password,
            name: FormData.name,
            email: FormData.email
        }))

        await dispatch(loginUserWithCredentials({
            username: FormData.username,
            password: FormData.password,
        }))
        // await dispatch(createNewAccount({
        //     username: FormData.username,
        //     password: FormData.username,
        //     name: FormData.name,
        //     email: FormData.password
        // }))
        // await signupUser(FormData)
        //     .then(resp => {
        //         loginUserWithCredentials(resp.username, resp.password)
        //     })
        //     .catch(err => {
        //         setErrorText(() => err.message)
        //     })
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    })

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
                    <span className={`util-heading-small ${styles.signupInputText}`}>Name</span>
                    <input type="text" className={styles.signupInput}
                        name="NAME"
                        onChange={formChangeHandler}
                    />
                    <span className={`util-heading-small ${styles.signupInputText}`}>Password</span>
                    <input type="password" className={styles.signupInput}
                        name="PASSWORD"
                        onChange={formChangeHandler}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className="submit-button"
                            style={{ backgroundColor: "black" }}
                            // onClick={handleSignupSubmit}
                            type="submit"
                        >SIGN UP</button>
                    </div>
                </form>
                <span className="util-heading-small" style={{ color: "red", textAlign: "center" }}>{error}</span>
            </div>
        </div>
    )
}