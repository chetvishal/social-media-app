import styles from './NotificationsPg.module.css';
import { Feed } from '../../posts/Feed/Feed';
import { NewPost } from '../../../Components';
import { NotificationCard } from '../NotificationCard/NotificationCard';

export const Notifications = () => {
    return (
        <div className={styles.notificationsPg}>
            <div className={styles.notificationsPg__heading}>
                <h2>Notifications</h2>
            </div>
            <NotificationCard text="in case you missed his tweet"/>
            
            <NotificationCard text="retweeted"/>
            
            <NotificationCard text="like a post"/>
            
            <NotificationCard />
        </div>
    )
}