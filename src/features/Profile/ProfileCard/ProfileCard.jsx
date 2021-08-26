import styles from './ProfileCard.module.css';
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate } from 'react-router';

export const ProfileCard = ({ text }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.profile}>
            <div className={styles.profile__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.profile__image}
                />
            </div>
            <div className={styles.profile__content} style={{ border: "1px solid black;" }}>
                <div className={styles.profile__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>Anonymous </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@Anonymous</span>
                </div>
                <div className={styles.profile__contentText}>
                    <span>
                        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero voluptates dolores facilis in reiciendis iste aperiam ex excepturi, blanditiis, deserunt pariatur ab fuga illo velit porro modi nemo quibusdam harum facere totam. Rerum doloremque ipsam quibusdam, beatae enim eum iste molestias non ad reprehenderit vero adipisci officia velit asperiores! Fuga at odio eos officia, eum neque. */}
                        {text}
                    </span>
                </div>
                <div className={styles.profile__actionBar}>
                    <div className={styles.profile__actionItem}>
                        <Location
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                        <span style={{ marginLeft: "6px" }}>New Delhi</span>
                    </div>
                    <div className={styles.profile__actionItem} style={{ marginLeft: "1rem" }}>
                        <Link
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                        <span style={{ marginLeft: "6px" }}>google.com</span>
                    </div>
                </div>
                <div className={styles.profile__statsAndEditProfile} style={{ marginTop: "1.1rem", }}>
                    <div className={styles.profile__actionItem}>
                        <div className={styles.profile__actionItem}>

                            <span style={{ marginLeft: "6px" }} onClick={() => navigate('/profile/following')}>37 Following</span>
                        </div>
                        <div className={styles.profile__actionItem} style={{ marginLeft: "1rem" }}>

                            <span style={{ marginLeft: "6px" }} onClick={() => navigate('/profile/followers')}>14 Followers</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/profile/edit')}
                            className={`submit-button ${styles.profile__Btn}`}>Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}