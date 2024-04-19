import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import './profile-search.styles.scss';
import FriendCard from '../../components/friend-card.component/friend-card.component';
import UserCard from '../../components/user-card.component/user-card.component';

const ProfileSearch = () => {
    const [token, setToken] = useState(null);
    const [results, setResults] = useState([]);

    const baseUrl = 'http://localhost:8888';

    const { searchString } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch your JWT from wherever it's stored (e.g., local storage, cookies, etc.)
        const jwt = localStorage.getItem('jwtToken');

        if (jwt) {
            setToken(jwt);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl + `/users/get-users-email/${searchString}`, {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                });
                console.log('logging data inside fetchData in profile search: ', response.data);
                setResults(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h1>Profile Search</h1>
            {results && results.map((user) => {
                return <UserCard user={user}/>
            })}
        </div>
    );

}

export default ProfileSearch;