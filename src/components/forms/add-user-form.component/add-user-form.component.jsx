import { useState } from 'react';
import axios from 'axios';

import './add-user-form.styles.css';
import { type } from '@testing-library/user-event/dist/type';

const AddUserForm = ({ formType, userId, closeModal, userData }) => {
    const baseUrl = 'http://localhost:8888';

    const [inputs, setInputs] = useState({
        userFName: '',
        userLName: '',
        userMiddleInitial: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formType === 'add' || formType === 'create') {
            if (inputs.userFName && inputs.userLName && inputs.userMiddleInitial && inputs.userEmail && inputs.userPassword && inputs.userPassword === inputs.userConfirmPassword) {
                axios.post(baseUrl + '/users/post-user', inputs)
                    .then(response => {
                        console.log(`Added user to records`);
                        setInputs({
                            userFName: '',
                            userLName: '',
                            userMiddleInitial: '',
                            userEmail: '',
                            userPassword: '',
                            userConfirmPassword: ''
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert("Please double check you aren't missing any of the required fields or passwords do not match.");
            }
        } else if (formType === 'edit') {
            console.log('userData is: ', userData);
            if (inputs.userFName && inputs.userLName && inputs.userMiddleInitial && inputs.userEmail && inputs.userPassword && inputs.userPassword === inputs.userConfirmPassword) {
                inputs.userId = userId;
                axios.put(baseUrl + '/users/update-user', inputs)
                    .then(response => {
                        console.log(`Edited user with id: ` + userId);
                        setInputs({
                            userFName: '',
                            userLName: '',
                            userMiddleInitial: '',
                            userEmail: '',
                            userPassword: '',
                            userConfirmPassword: ''
                        });
                        closeModal();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert("Please double check you aren't missing any of the required fields or passwords do not match.");
            }
        } 
    }

    return (
        <div className='form-box'>
            {formType === 'add' && (
                <h1>Add a user to records:</h1>
            )}
            {formType === 'edit' && (
                <h1>Edit a user:</h1>
            )}
            <form onSubmit={handleSubmit}>
                <label>First Name
                    <input
                        type="text"
                        name="userFName"
                        value={inputs.userFName}
                        onChange={handleChange}
                        placeholder={userData?.userFName || 'John'}
                    />
                </label>
                <label>Last Name
                    <input
                        type="text"
                        name="userLName"
                        value={inputs.userLName}
                        onChange={handleChange}
                        placeholder={userData?.userLName || 'Doe'}
                    />
                </label>
                <label>Middle Initial
                    <input
                        type="text"
                        name="userMiddleInitial"
                        value={inputs.userMiddleInitial}
                        onChange={handleChange}
                        placeholder={userData?.userMiddleInitial || 'L'}
                    />
                </label>
                <label>Email
                    <input
                        type="email"
                        name="userEmail"
                        value={inputs.userEmail}
                        onChange={handleChange}
                        placeholder={userData?.userEmail || 'test@test.com'}
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        name="userPassword"
                        value={inputs.userPassword}
                        onChange={handleChange}
                        placeholder={'**********'}
                    />
                </label>
                <label>Confirm Password
                    <input
                        type="password"
                        name="userConfirmPassword"
                        value={inputs.userConfirmPassword}
                        onChange={handleChange}
                        placeholder={'**********'}
                    />
                </label>
                {formType === 'add' && (
                    <input className='submitButton' type='submit' value='Add User' />
                )}
                {formType === 'edit' && (
                    <input className='submitButton' type='submit' value='Save User' />
                )}
                {formType === 'create' && (
                    <input className='submitButton' type='submit' value='Create Account' />
                )}
            </form>
        </div>
    );
}

export default AddUserForm;
