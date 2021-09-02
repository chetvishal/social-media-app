import styles from './Home.module.css';
import { Home2 as HomeIcon, Bell, User, User2, MagnifyingGlass } from '../../../Assets/Svg/index';
import { HomeFeed } from '../HomeFeed/HomeFeed';
import { NewPost } from '../../../Components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from '../feedSlice';

export const Home = ({ searchKeyword }) => {
    
    return (
        <div className={styles.home}>
            <NewPost />
            <HomeFeed />
        </div>
    )
}