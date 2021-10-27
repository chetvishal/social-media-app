import styles from './EditProfile.module.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, uploadProfilePic, getUserData } from '../profileSlice';
import { initializeUser } from '../../Auth/authSlice';

export const EditProfile = ({ text }) => {

    const navigate = useNavigate()
    const { userId, user, username, userToken: token } = useSelector(state => state.auth)
    const [pic, setPic] = useState(null);
    const [profilePic, setProfilePic] = useState(user?.avatarUrl === undefined ?
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" :
        user?.avatarUrl
    );
    const [FormData, setFormData] = useState({
        name: user.name,
        location: user?.location === undefined ? "" : user?.location,
        bio: user?.bio === undefined ? "" : user?.bio,
        website: user?.links === undefined ? "" : user?.links
    });
    const dispatch = useDispatch()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setPic(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePic(reader.result)
            // dispatch(uploadProfilePic({ userId, encodedImage: reader.result, token }))
        };
    };

    const handleChangeSubmit = (e) => {
        if (pic !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onloadend = () => {
                setProfilePic(reader.result)
                dispatch(uploadProfilePic({ userId, encodedImage: reader.result, token }))
            };
        } else
            alert("please select a profile pic")
    }

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
                    <div className={styles.editProfile__changeProfilePic}>
                        <label for="fileInput" className={styles.editProfile__profileImage}>
                            <img
                                src={profilePic} alt="profile pic"
                                className={styles.editProfile__image}
                            />
                            <span className={styles.editProfile__profilePicTxt}>Select</span>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            name="image"
                            onChange={handleFileInputChange}
                            // value={fileInputState}
                            className="form-input"
                            style={{ display: "none" }}
                        />
                        <span
                            style={{ marginLeft: "1rem", cursor: "pointer", display: pic !== null ? "" : "none" }}
                            onClick={handleChangeSubmit}
                        > Change</span>
                    </div>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Email</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <span>{user?.email}</span>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Username</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <span>@{username}</span>
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Name</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input
                        autocomplete="off"
                        type="text"
                        placeholder="Enter name"
                        className={styles.editProfileInput}
                        onChange={formChangeHandler}
                        name="NAME"
                        value={FormData.name}
                    />
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName}>
                    <span className="util-heading-medium">Location</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input
                        autocomplete="off"
                        type="text"
                        placeholder="Enter Location"
                        className={styles.editProfileInput}
                        onChange={formChangeHandler}
                        name="LOCATION"
                        value={FormData.location}
                    />
                </div>
            </div>
            <div className={styles.editProfile__editItem}>
                <div className={styles.editProfile__editItemName} >
                    <span className="util-heading-medium">Website</span>
                </div>
                <div className={styles.editProfile__editItemChange}>
                    <input
                        autocomplete="off"
                        type="text"
                        placeholder="Enter URL"
                        className={styles.editProfileInput}
                        onChange={formChangeHandler}
                        name="WEBSITE"
                        value={FormData.website}
                    />
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
                        name="BIO"
                        value={FormData.bio}
                    ></textarea>
                </div>
            </div>
            <div className={styles.editProfile__editItem} style={{ marginTop: "0.5rem" }}>
                <div className={styles.editProfile__editItemName}>

                </div>
                <div className={styles.editProfile__editItemChange}>
                    <button
                        onClick={() => {
                            FormData.name !== "" ?
                                dispatch(updateUserData({ ...FormData, userId, token }))
                                    .then(() => dispatch(getUserData({ username, token })))
                                    .then(() => {
                                        navigate(`/profile/${username}`)
                                        dispatch(initializeUser({ username, token }))
                                    })
                                    .catch(error => alert("failed to update user data, ", error))
                                :
                                alert("name should not be empty")

                        }}
                        className={`submit-button ${styles.editProfile__Btn}`}>UPDATE
                    </button>
                    <button
                        onClick={() => navigate(`/profile/${username}`)}
                        className={`submit-button ${styles.editProfile__Btn}`}
                        style={{ marginLeft: "0.4rem"}}
                    >CANCEL
                    </button>
                </div>
            </div>

        </div>
    )
}