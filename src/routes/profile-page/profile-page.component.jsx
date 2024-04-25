import { useEffect, useState } from 'react';
import './profile-page.styles.scss';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';
import CirclesComponent from '../../components/circlies.component/circles.component';
import FriendsComponent from '../../components/friends.component/friends.component';

import Cookies from 'js-cookie';

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
                Passionate Innovator Seeking New Opportunities
                </p>
                <p className='profile-email'>
                An avid seeker of knowledge and adventure, I thrive on exploring the intersections of technology, art, and humanity. With a passion for innovation and creativity, I am committed to continuous learning and growth. As a dedicated advocate for positive change, I leverage my skills to contribute meaningfully to society. Whether it's through writing, coding, or connecting with others, I strive to make a difference and inspire others to do the same. With a curious mind and an open heart, I embrace challenges as opportunities for growth and am always eager to embark on new journeys. Let's create, learn, and grow together.
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