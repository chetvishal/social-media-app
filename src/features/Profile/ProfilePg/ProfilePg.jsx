import { PostCard, Loader } from "../../../Components";
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../profileSlice";
import { useParams } from 'react-router';
import { useEffect } from "react";
import { checkLikedPost } from "../../../Services/PostServices";
import { isFollowing } from "../../../Services/ProfileServices";

export const ProfilePg = () => {

    const dispatch = useDispatch()
    const { status, userProfile, error, userPosts } = useSelector(state => state.profile)
    const { userId, user, userToken:token } = useSelector(state => state.auth)
    const { username } = useParams()

    useEffect(() => {
        (async () => {

            console.log("status in postPage useEffect: ", status, userProfile, username)
            if (status === "idle" || userProfile.username !== username && status !== "error") {
                console.log('useEffect if ran');
                await dispatch(getUserData({ username, token }));
            }
        })();
    })

    return status === "loading" || status === "idle" ?
        <div><Loader /></div> :
        status === "error" ?
            <div>error... {error}
            </div> :
            <div>
                <ProfileCard
                    bio={userProfile?.bio}
                    name={userProfile?.name}
                    username={userProfile?.username}
                    location={userProfile?.location}
                    website={userProfile?.links}
                    followersLength={userProfile?.followers?.length}
                    followingLength={userProfile?.following?.length}
                    userId={userProfile?._id}
                    avatarUrl={userProfile?.avatarUrl}
                    isFollowing={isFollowing(user?.following, userProfile?._id)}
                />
                <div style={{ display: "flex", padding: "6px 22px" }}>
                    <h2>Tweets</h2>
                </div>
                {
                    userPosts.length === 0 ?
                        <div>No posts</div> :
                        userPosts.map(post => {
                            console.log("while mapping userPosts: ", post?.likes, userProfile?._id)
                            return <PostCard
                                content={post.content}
                                name={post.userId.name}
                                username={post.userId.username}
                                postId={post._id}
                                likes={checkLikedPost(post.likes, userId)}
                                likesArr={post?.likes}
                                avatarUrl={post?.userId?.avatarUrl}
                            />
                        })
                }
            </div>

}