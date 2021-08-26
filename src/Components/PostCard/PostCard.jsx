import styles from './PostCard.module.css';
import { Heart, HeartFilled, Chat, Retweet, BookMark } from '../../Assets/Svg';
import { Link, useNavigate } from 'react-router-dom';

export const PostCard = ({ content, name, userId, postId}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.postCard}>
            <div className={styles.postCard__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.postCard__image}
                />
            </div>
            <div className={styles.postCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.postCard__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>{name} </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{userId}</span>
                </div>
                <div className={styles.postCard__contentText} onClick={() => navigate(`/post/${postId}`)}>
                    <span>
                        {content}
                        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero voluptates dolores facilis in reiciendis iste aperiam ex excepturi, blanditiis, deserunt pariatur ab fuga illo velit porro modi nemo quibusdam harum facere totam. Rerum doloremque ipsam quibusdam, beatae enim eum iste molestias non ad reprehenderit vero adipisci officia velit asperiores! Fuga at odio eos officia, eum neque. */}
                    </span>
                </div>

                <div className={styles.postCard__actionBar}>
                    <div className={styles.postCard__actionItem}>
                        <Heart
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                    </div>
                    <div className={styles.postCard__actionItem}>
                        <Chat
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                    </div>
                    <div className={styles.postCard__actionItem}>
                        <Retweet
                            style={{ width: "1.3rem", height: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                    </div>
                    <div className={styles.postCard__actionItem}>
                        <BookMark
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}