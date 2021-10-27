import styles from './NewPost.module.css';
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from '../../features/Feed/feedSlice';
import { getUserPosts } from '../../features/Profile/profileSlice';

export const NewPost = ({ toggleView }) => {
    const newPostTextBox = useRef(null);
    const { userId, username, userToken: token, user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            newPostHandler()
        }
    }

    const newPostHandler = (e) => {
        dispatch(createNewPost({
            userId,
            username,
            content: newPostTextBox.current.value,
            token
        }))
            .then(() => dispatch(getUserPosts({ token, userId })))
        newPostTextBox.current.value = ""
    }

    return (
        <div className={styles.newPost}>
            <div className={styles.newPost__imageContainer}>
                <img
                    src={
                        user?.avatarUrl === undefined ? "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" :
                            user?.avatarUrl
                    }
                    alt="profile pic"
                    className={styles.newPost__image}
                />
            </div>
            <div className={styles.newPost__content}>
                <div style={{ paddingTop: "0.8rem" }}>
                    <textarea
                        placeholder="Whats happening?"
                        className={styles.newPost__textarea}
                        rows="3"
                        onKeyPress={keyPressHandler}
                        maxLength="150"
                        ref={newPostTextBox}
                        style={{
                            width: "100%",
                            fontFamily: "inherit"
                        }}
                    ></textarea>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "1rem 0"
                }}>
                    <button
                        onClick={() => {
                            newPostHandler()
                            if (typeof toggleView === 'function') {
                                toggleView()
                            }
                        }}
                        className={`submit-button`}>POST</button>
                </div>
            </div>
        </div>
    )
}