import styles from './Home.module.css';
import { HomeFeed } from '../HomeFeed/HomeFeed';
import { NewPost } from '../../../Components';

export const Home = () => {
    
    return (
        <div className={styles.home}>
            <NewPost />
            <HomeFeed />
        </div>
    )
}