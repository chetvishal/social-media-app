import { ProfileCard } from '../ProfileCard/ProfileCard'
import styles from './Following.module.css'
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '../profileSlice';
import { FollowerCard } from '../Followers/Followers';

export const Following = () => {

    const { userProfile, status } = useSelector(state => state.profile)
    const { username } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (
            async () => {
                if (status === "idle" || userProfile.username !== username && status !== "error") {
                    console.log('useEffect if ran');
                    await dispatch(getUserData({ username }));
                }
            }
        )()
    })

    return status === "fulfilled" &&
        <div>
            {
                userProfile.following.map(user => {
                    return <FollowerCard name={user.name} username={user.username} />
                })
            }
        </div>

}