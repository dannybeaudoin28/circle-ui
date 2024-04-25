import { useState } from 'react';
import './login-form.styles.scss';

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

import Cookies from 'js-cookie';


const LoginForm = ({ setIsAuthenticatedFromLogin }) => {

    const navigate = useNavigate();

    const baseUrl = 'http://localhost:8888';

    const [loginInputs, setLoginInputs] = useState({
        userEmail: '',
        userPassword: '',
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = (event) => {
        const { userEmail, userPassword } = loginInputs;

        event.preventDefault();

        if (userEmail.length > 0 && userPassword.length > 0) {
            axios.post(baseUrl + '/auth/login', loginInputs)
                .then(response => {
                    // Extract the JWT from the response
                    const token = response.data;

                    if (token !== 'Incorrect login') {
                        const decoded = jwtDecode(token);

                        // Convert Unix timestamp to milliseconds since the epoch
                        const expTime = decoded.exp * 1000;

                        // Set JWT token as a session cookie with expiry time
                        Cookies.set('jwtToken', token, { expires: new Date(expTime) });

                        setLoginInputs({
                            userEmail: '',
                            userPassword: '',
                        });

                        setIsAuthenticatedFromLogin(true);

                        navigate('/profile-page');
                    } else {
                        setLoginInputs({
                            userEmail: '',
                            userPassword: '',
                        });
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                });
        };
    }


    return (
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <label>Email
                    <input
                        type="email"
                        name="userEmail"
                        value={loginInputs.userEmail}
                        onChange={handleChange}
                        placeholder='User Email'
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        name="userPassword"
                        value={loginInputs.userPassword}
                        onChange={handleChange}
                        placeholder='**********'
                    />
                </label>
                <input className='submitButton' type='submit' value='Login' />
            </form>
        </div>
    );
};

export default LoginForm;