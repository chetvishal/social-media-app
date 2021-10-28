import { PostCard, Loader } from '../../../Components';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { loadFeed } from '../feedSlice';
import { checkLikedPost } from '../../../Services/PostServices';
import axios from 'axios';
import { apiEndPoint } from '../../../Services/Api';
import { FollowerCard } from '../../Profile/Followers/Followers';

export const HomeFeed = () => {

    const { feed, status, error } = useSelector((state) => {
        return state.feed;
    });

    const { userId, userToken: token } = useSelector((state) => {
        return state.auth
    })

    const [suggestions, setSuggestions] = useState([])

    const suggestUsers = async () => {
        const response = await axios.get(`${apiEndPoint()}/user/suggestions/${userId}`, {

            headers: {
                'Authorization': token
            }
        })
        return response.data.suggestions;
    }

    const dispatch = useDispatch()

    useEffect(() => {
        (
            async function () {
                await dispatch(loadFeed({ userId, token }))
                const suggestions = await suggestUsers();
                setSuggestions(() => suggestions)
                console.log("suggestions: ", suggestions);
            }
        )()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {
                status === "loading" ?
                    <div><Loader /></div> :
                    status === "error" ?
                        <div>error {error}</div> :
                        feed.length !== 0 ? feed.map(item => {
                            return <PostCard
                                content={item.content}
                                name={item.userId.name}
                                username={item.userId.username}
                                postId={item._id}
                                likes={checkLikedPost(item.likes, userId)}
                                likesQty={item?.likes.length}
                                likesArr={item?.likes}
                                avatarUrl={item?.userId?.avatarUrl}
                                key={item?._id}
                            />
                        }) : <div> 
                            <h3>Users to follow</h3>
                        {
                            suggestions.map(item => {
                                return <FollowerCard name={item.name} username={item.username} avatarUrl={item?.avatarUrl} />
                            })
                        }</div>
            }
        </div>
    )
}