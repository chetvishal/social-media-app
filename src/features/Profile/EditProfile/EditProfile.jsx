import styles from './EditProfile.module.css';
import { Link, Chat, Retweet, Location } from '../../../Assets/Svg/index';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../profileSlice';

export const EditProfile = ({ text }) => {

    const navigate = useNavigate()
    const [FormData, setFormData] = useState({ name: "", location: "", bio: "", website: "" });
    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.auth)

    const formChangeHandler = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'NAME':
                setFormData(FormData => { return { ...FormData, name: e.target.value } })
                break;
            case 'LOCATION':
                setFormData(FormData => { return { ...FormData, location: e.target.value } })
                break;
            case 'BIO':
                setFormData(FormData => { return { ...FormData, bio: e.target.value } })
                break;
            case 'WEBSITE':
                setFormData(FormData => { return { ...FormData, website: e.target.value } })
                break;
            default:
                console.log("default case")
                break;
        }
    }

    return (
        <div className={styles.editProfile}>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Avatar</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <img
                        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="profile pic"
                        className={styles.editProfile__image}
                    />
                    <span style={{ marginLeft: "1rem" }}>Change</span>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Email</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <span>danabramove@gmail.com</span>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Username</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <span>@danabramov</span>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Name</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input autocomplete="off" type="text" placeholder="Enter name" className={styles.editProfileInput} onChange={formChangeHandler} name="NAME" />
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Location</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input autocomplete="off" type="text" placeholder="Enter Location" className={styles.editProfileInput}onChange={formChangeHandler} name="LOCATION" />
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName} >
                    <span className="util-heading-medium">Website</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input autocomplete="off" type="text" placeholder="Enter URL" className={styles.editProfileInput} onChange={formChangeHandler} name="WEBSITE" />
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Bio</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <textarea 
                        className={styles.editProfile__textarea}
                        rows="3"
                        maxLength="150"
                        onChange={formChangeHandler} 
                        name="BIO"></textarea>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <button
                        onClick={() => {
                            console.log("form data: ", FormData)
                            dispatch(updateUserData({ ...FormData, userId }))

                        }}
                        className={`submit-button ${styles.editProfile__Btn}`}>UPDATE
                    </button>
                </div>
            </div>

        </div>
    )
}