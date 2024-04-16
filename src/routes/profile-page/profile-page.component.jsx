import { useEffect, useState } from 'react';
import './profile-page.styles.css';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const ProfilePage = () => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [user, setUser] = useState([]);

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
                console.log('testing')
                const response = await axios.get(baseUrl + '/users/get-user-email/' + decodedToken.email, {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                });
                console.log('logging data inside fetchData: ', response);
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
      }, [decodedToken]);

    return (
        <>
            <h1>Welcome {user.userFName + ' ' + user.userMiddleInitial + '. ' + user.userLName}</h1>
            <p></p>
            {user.userImage && <img className='img-preview' src={`data:image/jpeg;base64,${user.userImage}`} alt=''/>}
            <p>Is your email still: {user.userEmail}</p>
        </>
    )
};

export default ProfilePage;