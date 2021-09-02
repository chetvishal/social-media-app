import { PostCard } from '../../../Components/index';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import styles from './PostPg.module.css'
import { useRef, useEffect } from "react";
import { getPost } from '../postSlice';
import { checkLikedPost } from '../../../Services/PostServices';
import { commentHandler } from '../postSlice';
import { useNavigate } from 'react-router-dom';

export const PostPg = () => {
    const { currentPost, status } = useSelector((state) => {
        return state.posts;
    });
    const { userId } = useSelector((state) => {
        return state.auth
    })
    const dispatch = useDispatch()
    const { postId } = useParams()
    const postTextBox = useRef(null);
    const navigate = useNavigate()

    const commentBtnHandler = async () => {
        console.log("commment button")
        dispatch(commentHandler({ userId, postId, content: postTextBox.current.value }))
    }

    useEffect(() => {
        // fetch post data
        (async () => {

            console.log("status in postPage useEffect: ", status, currentPost, postId)
            if (currentPost._id !== postId || status === "idle") {
                console.log('useEffect if ran');
                await dispatch(getPost(postId));
            }
        })();
    }, []);

    // console.log("currentPost: ", currentPost)
    // let postData = status === "fulfilled_getPost" ? currentPost : {
    //     content: "",
    //     userId: {
    //         name: "",
    //         username: ""
    //     },
    //     _id: ""
    // }
    let postData = currentPost;

    console.log("status in postPage before rendering page: ", status, "postDAta", postData)
    return status === "loading" || status === "idle" ?
        <div>loading...
            <button onClick={() => console.log("currentPost", currentPost, "postData: ", postData, "status: ", status)}>click me</button>
        </div>
        :
        <div className={styles.post}>
            <PostCard content={postData?.content}
                name={postData?.userId?.name}
                username={postData?.userId?.username}
                postId={postData?._id}
                likes={checkLikedPost(postData?.likes, userId)}
                likesArr={postData?.likes}
            />
            <div className={styles.post__newComment}>
                <div className={styles.post__newComment__imageContainer}>
                    <img
                        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                        className={styles.post__newComment__image}
                    />
                </div>
                <div className={styles.post__newComment__content} style={{ border: "1px solid black;" }}>
                    <div style={{ paddingTop: "0.8rem" }}>
                        <textarea
                            placeholder="Add a comment"
                            className={styles.post__newComment__textarea}
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
                        padding: "0.5rem 0"
                    }}>
                        <button
                            onClick={commentBtnHandler}
                            className={`submit-button`}>COMMENT</button>
                    </div>
                </div>
            </div>

            <div style={{ display: postData.comments.length !== 0 ? "flex" : "none", padding: "6px 22px" }}>
                    <h2>Comments</h2>
                </div>
            {/* PostCard */}
            {
                postData.comments.map(item => {
                    return <div className={styles.post__comment}>
                        <div className={styles.post__comment__imageContainer}>
                            <img
                                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                                className={styles.post__comment__image}
                            />
                        </div>
                        <div className={styles.post__comment__content} style={{ border: "1px solid black;" }}>
                            <div className={styles.post__comment__contentHeading}>
                                <span style={{ fontSize: "1rem", fontWeight: "500" }}>{item.commentUserId.name} </span>
                                <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{item.commentUserId.username}</span>
                            </div>
                            <div className={styles.post__comment__contentText}>
                                <span>
                                    {item.commentText}
                                </span>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>


}