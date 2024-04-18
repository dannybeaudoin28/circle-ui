import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import './add-user-form.styles.scss';
import ImgUploader from '../../img-uploader.component/img-uploader.component';

const AddUserForm = ({ formType, userId, closeModal, userData }) => {
    const [fileData, setFileData] = useState('');
    const baseUrl = 'http://localhost:8888';
    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwtToken');
    const formattedToken = jwtToken ? 'Bearer ' + jwtToken : '';

    const [inputs, setInputs] = useState({
        userFName: '',
        userLName: '',
        userMiddleInitial: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: '',
        userImage: '',
    });

    const handleDataFromImgUploader = (newFileData) => {
        setFileData(newFileData);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        const { userFName, userLName, userMiddleInitial, userEmail, userPassword, userConfirmPassword } = inputs;

        event.preventDefault();
        if (formType === 'add' || formType === 'create') {
            if (userFName && userLName && userMiddleInitial && userEmail && userPassword && userPassword === userConfirmPassword) {
                if (fileData) {
                    inputs.userImage = fileData;
                    console.log(inputs.userImage);
                }
                axios.post(baseUrl + '/users/post-user', inputs, {
                    headers: {
                        'Authorization': formattedToken,
                    }
                })
                    .then(response => {
                        console.log(`Added user to records`);
                        setInputs({
                            userFName: '',
                            userLName: '',
                            userMiddleInitial: '',
                            userEmail: '',
                            userPassword: '',
                            userConfirmPassword: '',
                            userImage: '',
                        });
                        //TODO: Validate response code and redirect or throw error based on code.
                        if (formType === 'create')
                            navigate('/home');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert("Please double check you aren't missing any of the required fields or passwords do not match.");
            }
        } else if (formType === 'edit') {
            if (userFName && userLName && userMiddleInitial && userEmail && userPassword && userPassword === userConfirmPassword) {
                inputs.userId = userId;
                axios.put(baseUrl + '/users/update-user', inputs, {
                    headers: {
                        'Authorization': formattedToken,
                    }
                })
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
                <h1>Add a user to records</h1>
            )}
            {formType === 'edit' && (
                <h1>Edit a user</h1>
            )}
            {formType === 'create' && (
                <h1>Create an account to find your cirle today!</h1>
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
                    <div>
                        <div>
                            <ImgUploader handleDataFromImgUploader={handleDataFromImgUploader} />
                        </div>
                        <input className='submitButton' type='submit' value='Create Account' />
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddUserForm;
