import { ProfileCard } from '../ProfileCard/ProfileCard';
import styles from './Followers.module.css';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '../profileSlice';


export const FollowerCard = ({ username, name }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.followersCard} onClick={() => navigate(`/profile/${username}`)}>
            <div className={styles.followersCard__imageContainer}>
                <img
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                    className={styles.followersCard__image}
                />
            </div>
            <div className={styles.followersCard__content} style={{ border: "1px solid black;" }}>
                <div className={styles.followersCard__contentHeading}>
                    <span style={{ fontSize: "1rem", fontWeight: "500" }}>{name} </span>
                    <span style={{ fontSize: "1rem", fontWeight: "300" }}>@{username}</span>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export const Followers = () => {


    const { userProfile, status } = useSelector(state => state.profile)
    const { userToken: token } = useSelector(state => state.auth)
    const { username } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (
            async () => {
                if (status === "idle" || userProfile.username !== username && status !== "error") {
                    console.log('useEffect if ran');
                    await dispatch(getUserData({ username, token }));
                }
            }
        )()
    })

    return (
        <div>
            {
                userProfile.followers.map(user => {
                    return <FollowerCard name={user.name} username={user.username} />
                })
            }
        </div>
    )
}