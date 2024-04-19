import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import './friend-page.styles.scss';

const FriendPage = () => {
    const { friendId } = useParams();

    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [user, setUser] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8888';

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
                const response = await axios.get(baseUrl + `/users/get-user/${friendId}`, {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                });
                console.log('logging data inside fetchData: ', response.data);
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className='view-user-profile-container'>
            <h1>{user.userFName} {user.userMiddleInitial} {user.userLName}</h1>
            <h2>{user.userEmail}</h2>
            {user.userImage && <img className='profile-image' src={`data:image/jpeg;base64,${user.userImage}`} alt='' />}
            <h3>User headline here..</h3>
            <p>User bio here...</p>
        </div>
    );
}

export default FriendPage;