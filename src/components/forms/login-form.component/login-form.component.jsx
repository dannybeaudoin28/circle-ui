import { useState } from 'react';
import './login-form.styles.css';

import axios from 'axios';


const LoginForm = ({ setIsAuthenticatedFromLogin }) => {

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
                console.log(response); // Log the entire response object
                let res = response?.data;
                console.log(res);
                setLoginInputs({
                    userEmail: '',
                    userPassword: '',
                })
            })
            .catch(error => {
                console.error(error);
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