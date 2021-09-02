import styles from './Feed.module.css';
import { PostCard } from '../../../Components';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { loadFeed } from '../feedSlice';
import { checkLikedPost } from '../../../Services/PostServices';

export const HomeFeed = () => {

    const { feed, status } = useSelector((state) => {
        console.log("state.feed: ", state.feed);
        return state.feed;
    });

    const { userId } = useSelector((state) => {
        return state.auth
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadFeed({ userId }))
    }, [])

    return (
        <div>
            {
                status === "loading" ?
                    <div>loading...</div> : feed.map(item => {
                        return <PostCard
                            content={item.content}
                            name={item.userId.name}
                            username={item.userId.username}
                            postId={item._id}
                            likes={checkLikedPost(item.likes, userId)}
                            likesQty={item?.likes.length}
                            likesArr={item?.likes}
                        />
                    })
            }
        </div>
    )
}