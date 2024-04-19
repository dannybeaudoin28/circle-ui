import { useEffect, useState } from 'react';
import './profile-page.styles.scss';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';
import CirclesComponent from '../../components/circlies.component/circles.component';
import FriendsComponent from '../../components/friends.component/friends.component';

const ProfilePage = () => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [user, setUser] = useState([]);

    //TODO: ADD Friends to pass to component
    const [friends, setFriends] = useState([]);

    const [showCirclesComponent, setShowCirclesComponent] = useState(false);
    const [showFriendsComponent, setShowFriendsComponent] = useState(false);

    const baseUrl = 'http://localhost:8888';

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        // Fetch your JWT from wherever it's stored (e.g., local storage, cookies, etc.)
        const jwt = localStorage.getItem('jwtToken');

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
                console.log('logging data inside fetchData: ', response.data);
                setUser(response.data);
                setFriends(response.data.socialConnections);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [decodedToken]);

    const handleCircleClick = () => {
        setShowCirclesComponent(true);
        setShowFriendsComponent(false);
        console.log('user is: ', user);
    };

    const handleFriendsClick = () => {
        setShowFriendsComponent(true);
        setShowCirclesComponent(false);
    };

    return (
        <div className="profile-background">
            <div className="profile-container">
                <h1 className="profile-name">
                    Welcome {user.userFName} {user.userMiddleInitial}. {user.userLName}
                </h1>
                {user.userImage && <img className='profile-image' src={`data:image/jpeg;base64,${user.userImage}`} alt='' />}
                <p className="profile-email">
                    Headline goes here
                </p>
                <p className='profile-email'>
                    Bio goes here
                </p>
            </div>
            <div className='button-container'>
                <button onClick={handleCircleClick}>Circles</button>
                <button onClick={handleFriendsClick}>Friends</button>
            </div>
            <div className='content-container'>
                {showCirclesComponent && <CirclesComponent />}
                {showFriendsComponent && <FriendsComponent friends={friends}/>}
            </div>
        </div>
    )
};

export default ProfilePage;