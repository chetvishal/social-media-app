import styles from './NewPost.module.css';
import { useRef, useState } from "react";
import { Heart, HeartFilled, Chat, Retweet, BookMark } from '../../Assets/Svg';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../features/posts/postSlice';

export const NewPost = () => {
    const newPostTextBox = useRef(null);
    const [newPostContent, setNewPostContent] = useState("")
    const dispatch = useDispatch();
    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            dispatch(createPost({
                postID: `p${Math.floor(Math.random() * 500)}`,
                content: newPostTextBox.current.value,
                likes: Math.floor(Math.random() * 50),
                user: {
                    userID: "u1234",
                    name: "tanay"
                }
            }))
        }
    }

    return (
        <div className={styles.newPost}>
            <div className={styles.newPost__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.newPost__image}
                />
            </div>
            <div className={styles.newPost__content} style={{ border: "1px solid black;" }}>
                <div style={{ paddingTop: "0.8rem" }}>
                    <textarea
                        placeholder="Whats happening?"
                        className={styles.newPost__input}
                        rows="3"
                        onBlur={(e) => setNewPostContent(e.target.value)}
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
                            // console.log("newPostContent", newPostContent)
                            // console.log("value of text box: ", newPostTextBox.current.value)
                            dispatch(createPost({
                                postID: `p${Math.floor(Math.random() * 500)}`,
                                content: newPostTextBox.current.value,
                                likes: Math.floor(Math.random() * 50),
                                user: {
                                    userID: "u1234",
                                    name: "tanay"
                                }
                            }))
                        }}
                        className={`submit-button ${styles.newPost__Btn}`}>POST</button>
                </div>
            </div>
        </div>
    )
}