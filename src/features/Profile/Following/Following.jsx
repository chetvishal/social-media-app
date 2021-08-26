import { ProfileCard } from '../ProfileCard/ProfileCard'
import styles from './Following.module.css'
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate } from 'react-router';

const FollowingCard = ({ text }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.followingCard}>
            <div className={styles.followingCard__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.followingCard__image}
                />
            </div>
            <div className={styles.followingCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.followingCard__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>Anonymous </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@Anonymous</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/profile/edit')}
                        className={`submit-button ${styles.followingCard__Btn}`}>Following
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Following = () => {
    return (
        <div>

            <FollowingCard text="hello world" />

            <FollowingCard text="hello world" />


            <FollowingCard text="hello world" />

            <FollowingCard text="hello world" />
        </div>
    )
}