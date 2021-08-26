import styles from './Feed.module.css';
import { PostCard } from '../../../Components';
import { useSelector } from "react-redux";

export const Feed = () => {

    const { posts } = useSelector((state) => {
        console.log("state.posts: ", state.posts);
        return state.posts;
    });

    return (
        <div>
            {
                posts.length !== 0 && posts.map(item => {
                    return <PostCard content={item.content} name={item.user.name} userId={item.user.userID} postId={item.postID}/>
                })
            }
            {/* <PostCard content="post card 1" name="Anonymous" userId="anon"/>
            <PostCard content="post card 1" name="Anonymous" userId="anon"/>
            <PostCard content="post card 1" name="Anonymous" userId="anon"/>
            <PostCard content="post card 1" name="Anonymous" userId="anon"/>
            <PostCard content="post card 1" name="Anonymous" userId="anon"/> */}
            {/* <PostCard text="post card 2" />
            <PostCard text="post card 3" />
            <PostCard text="post card 4" />
            <PostCard text="post card 5" /> */}
            {/* <button onClick={() => console.log("state.posts", posts)} >click me</button> */}
        </div>
    )
}