import styles from './ProfileCard.module.css';
import { Link, Location } from '../../../Assets/Svg/index';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../profileSlice';
import { followUser_auth, unfollowUser_auth } from '../../Auth/authSlice';

export const ProfileCard = ({
    bio,
    name,
    username,
    location,
    website,
    followersLength,
    followingLength,
    userId,
    isFollowing,
    avatarUrl
}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { username: username_auth, userId: userId_auth, user, userToken: token } = useSelector(state => state.auth)
    const { username: username_Params } = useParams()
    const handleFollowClick = (e) => {

        // isFollowing ? console.log("feature not available"):  dispatch(followUser({ userId: userId_auth, toFollowUserId: userId }))
        if (!isFollowing) {
            dispatch(followUser({ userId: userId_auth, toFollowUserId: userId, token }))
            dispatch(followUser_auth({ _id: userId, name, username, avatarUrl }))
        } else {
            dispatch(unFollowUser({ userId: userId_auth, toUnFollowUserId: userId, token }))
            dispatch(unfollowUser_auth({ _id: userId, name, username, avatarUrl }))
        }
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.profile__image}
                />
            </div>
            {/* <button onClick={() => console.log("profile data", bio,
                "user", user,)}>click me</button> */}
            <div className={styles.profile__content} style={{ border: "1px solid black;" }}>
                <div className={styles.profile__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>{name} </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{username}</span>
                </div>
                <div className={styles.profile__contentText}>
                    <span>
                        {bio}
                    </span>
                </div>
                <div className={styles.profile__actionBar}
                    style={{ display: location === undefined && website === undefined ? "none" : "" }}
                >
                    <div
                        className={styles.profile__actionItem}
                        style={{ display: location === undefined || location === "" ? "none" : "" }}>
                        <Location
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                        <span style={{ marginLeft: "6px" }}>{location}</span>
                    </div>
                    <div
                        className={styles.profile__actionItem}
                        style={{
                            marginLeft: "1rem",
                            display: website === undefined || website === "" ? "none" : ""
                        }}>
                        <Link
                            style={{ width: "1.3rem", fill: "#909090", cursor: "pointer" }}
                        />
                        <span style={{ marginLeft: "6px" }}>{website}</span>
                    </div>
                </div>
                <div className={styles.profile__statsAndEditProfile} style={{ marginTop: "1.1rem", }}>
                    <div className={styles.profile__actionItem}>
                        <div className={styles.profile__actionItem}>

                            <span style={{ marginLeft: "6px" }} onClick={() => navigate(`/profile/${username_Params}/following`)}>{followingLength} Following</span>
                        </div>
                        <div className={styles.profile__actionItem} style={{ marginLeft: "1rem" }}>

                            <span style={{ marginLeft: "6px" }} onClick={() => navigate(`/profile/${username_Params}/followers`)}>{followersLength} Followers</span>
                        </div>
                    </div>
                    <div>
                        {
                            username_auth === username_Params ?
                                <button
                                    onClick={() => navigate('/profile/edit')}
                                    className={`submit-button ${styles.profile__Btn}`}>Edit Profile
                                </button> :
                                <button
                                    onClick={handleFollowClick}
                                    className={`submit-button ${styles.profile__Btn}`}>  {isFollowing ? "Following" : "Follow"}
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}