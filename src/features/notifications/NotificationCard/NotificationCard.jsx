import styles from './NotificationCard.module.css';
import { useNavigate } from 'react-router-dom';

export const NotificationCard = ({ type, name, username, postId, avatarUrl }) => {

    const navigate = useNavigate()

    const notificationContent = (type) => {
        switch (type) {
            case "Follow":
                return <span onClick={() => navigate(`/profile/${username}`)}>{name} started following you</span>
            case "Comment":
                return <span onClick={() => navigate(`/post/${postId}`)}>{name} commented on your post</span>
            case "Post":
                return <span onClick={() => navigate(`/post/${postId}`)}>In case you missed {name}'s post </span>
            case "Like":
                return <span onClick={() => navigate(`/post/${postId}`)}>{name} Liked your post</span>
            default:
                return <span>Notification from {name}</span>
        }
    }

    return (
        <div className={styles.notificationCard}>
            <div className={styles.notificationCard__imageContainer}>
                <img
                    src={
                        avatarUrl === undefined ? "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" :
                            avatarUrl
                    }
                     alt="profile pic"
                    className={styles.notificationCard__image}
                />
            </div>
            <div className={styles.notificationCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.notificationCard__contentHeading} onClick={() => navigate(`/profile/${username}`)}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }} className={styles.NotificationCard__userName}>{name} </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{username}</span>
                </div>
                <div className={styles.notificationCard__contentText}>
                    <span>
                        {
                            notificationContent(type)
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}