import styles from './SearchPg.module.css'
import { useState, useEffect } from 'react';
import { FollowerCard } from '../../Profile/Followers/Followers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSearchResult } from '../searchSlice';
import { useToken } from '../../../Services/useToken';

export const SearchPg = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const { searchResult } = useSelector(state => state.search)
    const { userToken: token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const gettoken = useToken()

    function ExecuteSearch() {
        dispatch(getUserSearchResult({ searchQuery, token }))
        // gettoken(token => dispatch(getUserSearchResult({ searchQuery, token })))
    }

    useEffect(() => {
        (async () => {
            dispatch(getUserSearchResult({ searchQuery, token }))
            // gettoken(token => dispatch(getUserSearchResult({searchQuery: "" , token })))
        })();
    }, [])


    return (
        <div style={{ textAlign: "left" }} className={styles.search}>
            <span className={`util-heading-small ${styles.searchInputText}`}>Search</span>
            <input type="text" className={styles.searchInput} onChange={e => setSearchQuery(e.target.value)} />
            <button
                // onClick={() => dispatch(getUserSearchResult({ searchQuery, token }))}
                onClick={ExecuteSearch}
                className={`submit-button ${styles.search__Btn}`}>Search
            </button>
            <div className={styles.searchResult}>
                {
                    searchResult.map(item => {
                        return <FollowerCard name={item.name} username={item.username} avatarUrl={item?.avatarUrl}/>
                    })
                }
            </div>
        </div>
    )
}