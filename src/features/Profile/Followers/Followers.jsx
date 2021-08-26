import { ProfileCard } from '../ProfileCard/ProfileCard';
import styles from './Followers.module.css'
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate } from 'react-router';

const FollowersCard = ({ text }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.followersCard}>
            <div className={styles.followersCard__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.followersCard__image}
                />
            </div>
            <div className={styles.followersCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.followersCard__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>Anonymous </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@Anonymous</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/profile/edit')}
                        className={`submit-button ${styles.followersCard__Btn}`}>Follow
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Followers = () => {
    return (
        <div>
            <FollowersCard text="hello world" />

            <FollowersCard text="hello world" />


            <FollowersCard text="hello world" />

            <FollowersCard text="hello world" />
        </div>
    )
}