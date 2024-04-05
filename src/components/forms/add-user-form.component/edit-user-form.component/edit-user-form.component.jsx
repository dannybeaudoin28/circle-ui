import './edit-user-form.styles.css';

import { useState } from 'react';

import axios from 'axios';

const EditUserForm = ({ userId }) => {
    const baseUrl = 'http://localhost:8888';

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        inputs.userId = userId;
        axios.put(baseUrl + '/users/update-user', inputs)
            .then(response => {
                console.log(`Added user to records`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='form-box'>
            <h1>Edit a user:</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name
                    <input
                        type="text"
                        name="userFName"
                        value={inputs.userFName || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Last Name
                    <input
                        type="text"
                        name="userLName"
                        value={inputs.userLName || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Middle Initial
                    <input
                        type="text"
                        name="userMiddleInitial"
                        value={inputs.userMiddleInitial || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Email
                    <input
                        type="email"
                        name="userEmail"
                        value={inputs.userEmail || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        name="userPassword"
                        value={inputs.userPassword || ""}
                        onChange={handleChange}
                    />
                </label>
                <input className='submitButton' type='submit' value='Save User' />
            </form>
        </div>
    );
}

export default EditUserForm;