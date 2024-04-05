import { useState } from 'react';
import axios from 'axios';

import './add-user-form.styles.css';

const AddUserForm = () => {
    const baseUrl = 'http://localhost:8888';

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs.user_f_name);
        axios.post(baseUrl + '/users/post-user', inputs)
            .then(response => {
                console.log(`Added user to records`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='form-box'>
          <h1>Add a user to records:</h1>
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
                <input className='submitButton' type='submit' />
            </form>
        </div>
    );
}

export default AddUserForm;