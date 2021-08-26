import { PostCard } from "../../../Components";
import { ProfileCard } from '../ProfileCard/ProfileCard'

export const ProfilePg = () => {
    return (
        <div>
            <ProfileCard text="bunny is a bunny is a a rider" />
            <div style={{ display: "flex", padding: "6px 22px" }}>
                <h2>Tweets</h2>
            </div>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    )
}