import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

import './friend-page.styles.scss';

import Cookies from 'js-cookie';

const FriendPage = () => {
    const { friendId } = useParams();

    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8888';

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch your JWT from wherever it's stored (e.g., local storage, cookies, etc.)
        const jwt = Cookies.get('jwtToken'); 

        if (jwt) {
            // Decode the JWT
            const decoded = jwtDecode(jwt);
            setToken(jwt);
            setDecodedToken(decoded);
            console.log(decoded);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl + '/users/get-user-email/' + decodedToken.email, {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                });
                console.log('logging data inside fetchData: ', response.data.userId);
                setUserId(response.data.userId);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [decodedToken]);

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

    const addFriend = async (id, userId) => {
        try {
            const response = await axios.post(
                baseUrl + `/users/${userId}/connections/${id}`,
                null,
                {
                    headers: {
                        'Authorization': "Bearer " + token,
                    }
                }
            );
            console.log('Added friend');
        } catch (error) {
            console.error(error);
        }
    };

    const messageFriend = (receiveId, sendId) => {
        navigate(`/messenger/${sendId}/${receiveId}`);
    };

    return (
        <div className='profile-background'>
            <div className='view-user-profile-container'>
                <h1>{user.userFName} {user.userMiddleInitial} {user.userLName}</h1>
                <h2>{user.userEmail}</h2>
                {/* TODO: add clickable link on profile picture to view all photos */}
                {user.userImage && <img className='profile-image' src={`data:image/jpeg;base64,${user.userImage}`} alt='' />}
                <h3>Passionate Innovator Seeking New Opportunities</h3>
                <p>An avid seeker of knowledge and adventure, I thrive on exploring the intersections of technology, art, and humanity. With a passion for innovation and creativity, I am committed to continuous learning and growth. As a dedicated advocate for positive change, I leverage my skills to contribute meaningfully to society. Whether it's through writing, coding, or connecting with others, I strive to make a difference and inspire others to do the same. With a curious mind and an open heart, I embrace challenges as opportunities for growth and am always eager to embark on new journeys. Let's create, learn, and grow together.</p>
                <button className="button" onClick={() => messageFriend(user.userId, userId)}>Message</button>
                <button className="button" onClick={() => addFriend(user.userId, userId)}>Add Friend</button>
            </div>
        </div>
    );
}

export default FriendPage;