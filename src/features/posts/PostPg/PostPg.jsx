import { PostCard } from '../../../Components/index';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import styles from './PostPg.module.css'
import { useRef, useState } from "react";
// import { Heart, HeartFilled, Chat, Retweet, BookMark } from '../../Assets/Svg';
import { Link, useNavigate } from 'react-router-dom';

export const PostPg = () => {
    const { posts } = useSelector((state) => {
        console.log("state.posts: ", state.posts);
        return state.posts;
    });
    const { id } = useParams()
    const findItem = posts.find(i => i.postID === id)
    const postTextBox = useRef(null);
    const navigate = useNavigate()
    return (
        <div>
            <PostCard content={findItem.content} name={findItem.user.name} userId={findItem.user.userID} postId={findItem.postID} />
            <div className={styles.post}>
                <div className={styles.post__imageContainer}>
                    <img
                        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                        className={styles.post__image}
                    />
                </div>
                <div className={styles.post__content} style={{ border: "1px solid black;" }}>
                    <div style={{ paddingTop: "0.8rem" }}>
                        <textarea
                            placeholder="Comment..."
                            className={styles.post__input}
                            rows="3"
                            maxLength="150"
                            ref={postTextBox}
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

                            className={`submit-button ${styles.post__Btn}`}>COMMENT</button>
                    </div>
                </div>
            </div>


            {/* PostCard */}
            <div className={styles.post__comment}>
                <div className={styles.post__comment__imageContainer}>
                    <img
                        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                        className={styles.post__comment__image}
                    />
                </div>
                <div className={styles.post__comment__content} style={{ border: "1px solid black;" }}>
                    <div className={styles.post__comment__contentHeading}>
                        <span style={{ fontSize: "1rem", fontWeight: "500" }}>Tanay </span>
                        <span style={{ fontSize: "1rem", fontWeight: "300" }}>@Tanay</span>
                    </div>
                    <div className={styles.post__comment__contentText}>
                        <span>
                            nice work
                            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero voluptates dolores facilis in reiciendis iste aperiam ex excepturi, blanditiis, deserunt pariatur ab fuga illo velit porro modi nemo quibusdam harum facere totam. Rerum doloremque ipsam quibusdam, beatae enim eum iste molestias non ad reprehenderit vero adipisci officia velit asperiores! Fuga at odio eos officia, eum neque. */}
                        </span>
                    </div>


                </div>
            </div>
        </div>
    )
}