import styles from './SearchPg.module.css'
import { useState } from 'react';
import { FollowerCard } from '../../Profile/Followers/Followers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSearchResult } from '../searchSlice';

export const SearchPg = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const { searchResult } = useSelector(state => state.search)
    const dispatch = useDispatch()

    return (
        <div style={{ textAlign: "left" }} className={styles.search}>
            <span className={`util-heading-small ${styles.searchInputText}`}>Search</span>
                <input type="text" className={styles.searchInput} onChange={e => setSearchQuery(e.target.value)} />
                <button
                    onClick={() => dispatch(getUserSearchResult({ searchQuery }))}
                    className={`submit-button ${styles.search__Btn}`}>Search
                </button>
            <div className={styles.searchResult}>
                {
                    searchResult.map(item => {
                        return <FollowerCard name={item.name} username={item.username} />
                    })
                }
            </div>
        </div>
    )
}