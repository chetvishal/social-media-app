import styles from './NotificationsPg.module.css';
import { NotificationCard } from '../NotificationCard/NotificationCard';
import { useSelector } from 'react-redux';
import { Loader } from '../../../Components';

export const Notifications = () => {

    const { notifications, state } = useSelector(state => state.notification)

    return (
        <div className={styles.notificationsPg}>
            <div className={styles.notificationsPg__heading}>
                <h2>Notifications</h2>
            </div>
            {
                state === "loading" || state === "idle" ?

                    <div><Loader /></div> :
                    state === "error" && !Array.isArray(notifications) ? <div>Error...</div> :
                        notifications.map(notification => {
                            console.log("originUser: ", notification)
                            return <NotificationCard
                                type={notification?.notificationType}
                                name={notification?.originUser?.name}
                                username={notification?.originUser?.username}
                                postId={notification?.postId}
                                avatarUrl={notification?.avatarUrl}
                            />
                        })
            }
        </div>
    )
}