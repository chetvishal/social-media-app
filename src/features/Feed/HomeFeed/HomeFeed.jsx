import styles from './Feed.module.css';
import { PostCard } from '../../../Components';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { loadFeed } from '../feedSlice';
import { checkLikedPost } from '../../../Services/PostServices';

export const HomeFeed = () => {

    const { feed, status, error } = useSelector((state) => {
        console.log("state.feed: ", state.feed);
        return state.feed;
    });

    const { userId, userToken: token } = useSelector((state) => {
        return state.auth
    })

    const dispatch = useDispatch()

    useEffect(() => {
        (
            async function () {
                console.log("token before dispatch: ", token)
                await dispatch(loadFeed({ userId, token }))
            }
        )()
    }, [])

    return (
        <div>
            {
                status === "loading" ?
                    <div>loading...</div> :
                    status === "error" ?
                        <div>error {error}

                            <button onClick={async () => await dispatch(loadFeed({ userId, token }))}>click me</button>
                        </div> :
                        feed.map(item => {
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