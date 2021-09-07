import styles from './PostCard.module.css';
import { Heart, HeartFilled, Chat } from '../../Assets/Svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeHandler, addLike__Post, removeLike__Post } from '../../features/posts/postSlice';
import { addLike__Feed, removeLike__Feed } from '../../features/Feed/feedSlice';
import { addLike__Profile, removeLike__Profile } from '../../features/Profile/profileSlice';
import { checkLikedPost } from '../../Services/PostServices';


export const PostCard = ({ content, name, username, postId, likes, likesQty, likesArr, avatarUrl }) => {

    const navigate = useNavigate();
    const { userId, userToken } = useSelector((state) => {
        return state.auth
    })
    const dispatch = useDispatch()

    const likeButtonHandler = async () => {
        if (checkLikedPost(likesArr, userId)) {
            dispatch(likeHandler({ postId, userId: userId, like: false, token: userToken }))
            dispatch(removeLike__Post({ userId }))
            dispatch(removeLike__Feed({ userId, postId }))
            dispatch(removeLike__Profile({ userId, postId }))
        }
        else {
            dispatch(likeHandler({ postId, userId: userId, like: true, token: userToken }))
            dispatch(addLike__Post({ userId }))
            dispatch(addLike__Feed({ userId, postId }))
            dispatch(addLike__Profile({ userId, postId }))
        }
    }

    return (
        <div className={styles.postCard}>
            <div className={styles.postCard__imageContainer}>
                <img
                    src={
                        avatarUrl === undefined ? "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" :
                            avatarUrl
                    }
                    alt="profile pic"
                    className={styles.postCard__image}
                />
            </div>
            <div className={styles.postCard__content}>
                <div className={styles.postCard__contentHeading} onClick={() => navigate(`/profile/${username}`)}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }} className={styles.postCard__name}>{name} </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{username}</span>
                </div>
                <div className={styles.postCard__contentText} onClick={() => navigate(`/post/${postId}`)}>
                    <span>
                        {content}
                    </span>
                </div>

                <div className={styles.postCard__actionBar}>
                    <div className={`${styles.postCard__actionItem} ${styles.postCard__likePost}`}
                        onClick={likeButtonHandler}
                    >
                        {checkLikedPost(likesArr, userId) ?
                            <HeartFilled style={{ width: "1.3rem", fill: "#ed4956", cursor: "pointer" }} /> :
                            <Heart
                                style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                            />}
                        <span style={{ marginLeft: "0.4rem", color: "#909090", fontSize: "1.1rem" }}>
                            {likesArr.length}
                        </span>
                    </div>
                    <div className={styles.postCard__actionItem} onClick={() => navigate(`/post/${postId}`)}>
                        <Chat
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}