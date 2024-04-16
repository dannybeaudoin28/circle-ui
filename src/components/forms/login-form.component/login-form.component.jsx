import { useState } from 'react';
import './login-form.styles.css';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const LoginForm = ({ setIsAuthenticatedFromLogin }) => {

    const navigate = useNavigate();

    const baseUrl = 'http://localhost:8888';

    const [loginInputs, setLoginInputs] = useState({
        userEmail: '',
        userPassword: '',
    })

    const handleChange = (event) => {
        console.log('changing input')

        const name = event.target.name;
        const value = event.target.value;
        setLoginInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = (event) => {
        const { userEmail, userPassword } = loginInputs;
    
        event.preventDefault();
    
        axios.post(baseUrl + '/auth/login', loginInputs)
            .then(response => {
                // Extract the JWT from the response
                const token = response.data;
    
                // Store the JWT in localStorage
                localStorage.setItem('jwtToken', token);
                console.log('inside handleSubmit of LoginForm token is: ', localStorage.getItem('jwtToken'))

                // Optionally, you can decode the JWT to access its payload
                // const decodedToken = jwt_decode(token);
                // console.log(decodedToken);
    
                // Clear the login inputs
                setLoginInputs({
                    userEmail: '',
                    userPassword: '',
                });
    
                navigate('/admin-panel');
            })
            .catch(error => {
                console.error('Login error:', error);
                // Handle login errors (e.g., display error message)
            });
    };    
    
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