import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '../profileSlice';
import { FollowerCard } from '../Followers/Followers';

export const Following = () => {

    const { userProfile, status } = useSelector(state => state.profile)
    const { userToken: token } = useSelector(state => state.auth)
    const { username } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (
            async () => {
                if ((status === "idle" || userProfile.username !== username) && status !== "error") {
                    await dispatch(getUserData({ username, token }));
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