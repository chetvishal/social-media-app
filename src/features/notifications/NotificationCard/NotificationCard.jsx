import styles from './NotificationCard.module.css';
import { Heart, HeartFilled, Chat, Retweet, BookMark } from '../../../Assets/Svg/index';

export const NotificationCard = ({ text }) => {

    return (
        <div className={styles.notificationCard}>
            <div className={styles.notificationCard__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.notificationCard__image}
                />
            </div>
            <div className={styles.notificationCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.notificationCard__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>Anonymous </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@Anonymous</span>
                </div>
                <div className={styles.notificationCard__contentText}>
                    <span>
                        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero voluptates dolores facilis in reiciendis iste aperiam ex excepturi, blanditiis, deserunt pariatur ab fuga illo velit porro modi nemo quibusdam harum facere totam. Rerum doloremque ipsam quibusdam, beatae enim eum iste molestias non ad reprehenderit vero adipisci officia velit asperiores! Fuga at odio eos officia, eum neque. */}
                        {text}
                    </span>
                </div>
            </div>
        </div>
    )
}