import styles from './EditProfile.module.css';
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate } from 'react-router';

export const EditProfile = ({ text }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.editProfile}>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Avatar</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    {/* <div className={styles.editProfile__ImageEdit}> */}
                        <img
                            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                            className={styles.editProfile__image}
                        />
                        <span style={{marginLeft: "1rem"}}>Change</span>
                    {/* </div> */}
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Email</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    {/* <div className={styles.editProfile__ImageEdit}> */}
                        <span style={{marginLeft: "1rem"}}>danabramove@gmail.com</span>
                    {/* </div> */}
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Username</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    {/* <div className={styles.editProfile__ImageEdit}> */}
                        <span style={{marginLeft: "1rem"}}>@danabramov</span>
                    {/* </div> */}
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Name</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input type="text" placeholder="Enter name"/>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Location</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input type="text" placeholder="Enter Location"/>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName} >
                    <span className="util-heading-medium">Website</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input type="text" placeholder="Enter URL"/>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Bio</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <textarea></textarea>
                </div>
            </div>
        </div>
    )
}