import styles from './SearchPg.module.css'
import { useState, useEffect } from 'react';
import { FollowerCard } from '../../Profile/Followers/Followers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSearchResult } from '../searchSlice';
import { debounce } from '../../../Services/Debounce';

export const SearchPg = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const { searchResult } = useSelector(state => state.search)
    const { userToken: token } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    function ExecuteSearch() {
        dispatch(getUserSearchResult({ searchQuery, token }))
        // gettoken(token => dispatch(getUserSearchResult({ searchQuery, token })))
    }

    function search(e) {
        e.preventDefault();
        setSearchQuery(e.target.value);
        const debounceSearch = debounce(300)
        debounceSearch(ExecuteSearch)
    }

    useEffect(() => {
        (async () => {
            dispatch(getUserSearchResult({ searchQuery, token }))
            // gettoken(token => dispatch(getUserSearchResult({searchQuery: "" , token })))
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div style={{ textAlign: "left" }} className={styles.search}>
            <span className={`util-heading-small ${styles.searchInputText}`}>Search</span>
            <input type="text" className={styles.searchInput} onChange={e => search(e)} />
            <button
                // onClick={() => dispatch(getUserSearchResult({ searchQuery, token }))}
                onClick={ExecuteSearch}
                className={`submit-button ${styles.search__Btn}`}>Search
            </button>
            <div className={styles.searchResult}>
                {
                    searchResult.length !== 0 ? searchResult.map(item => {
                        return <FollowerCard name={item.name} username={item.username} avatarUrl={item?.avatarUrl}/>
                    }) : <h3>No user found</h3>
                }
            </div>
        </div>
    )
}