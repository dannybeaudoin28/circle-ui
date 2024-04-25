import './admin-panel.styles.scss';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useState, useEffect } from 'react';
import AddUserForm from '../../components/forms/add-user-form.component/add-user-form.component';

import Cookies from 'js-cookie';

import Modal from 'react-modal';

const AdminPanel = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const jwtToken = Cookies.get('jwtToken');
    const formattedToken = jwtToken ? 'Bearer ' + jwtToken : '';

    const baseUrl = 'http://localhost:8888';

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const editUser = (userData) => {
        console.log(userData);
        setUser(userData);
        setUserId(userData.userId);
        setIsOpen(true);
    };

    const deleteUser = (id) => {
        axios.delete(baseUrl + '/users/delete-user/' + id, {
            headers: {
                'Authorization': formattedToken,
            }
        }).then(response => {
            console.log(`Deleted post with ID ${id}`);
        }).catch(error => {
            console.error(error);
        });
    };

    const updateUserList = (newUser) => {
        setUsers([...users, newUser]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('testing')
                const response = await axios.get(baseUrl + '/users/get-users', {
                    headers: {
                        'Authorization': formattedToken,
                    }
                });
                console.log('logging data inside fetchData: ', response);
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit User Modal"
                    appElement={document.getElementById('root')}
                    userId={userId}
                    user={user}
                    style={customStyles}
                >
                    <button className="button" onClick={closeModal}>Cancel</button>
                    <AddUserForm closeModal={closeModal} userId={userId} userData={user} formType="edit" />
                </Modal>
            </div>
            <div className='responsive-container'>
                <div className='content'>
                    <div className='table-container'>
                        <h1>Users</h1>
                        <div className='table-scroll'>
                            <table className='styled-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Middle Initial</th>
                                        <th>Last Name</th>
                                        <th>Image</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((userData) => (
                                        <tr key={userData.userId}>
                                            <td>{userData.userId}</td>
                                            <td>{userData.userEmail}</td>
                                            <td>{userData.userFName}</td>
                                            <td>{userData.userMiddleInitial}</td>
                                            <td>{userData.userLName}</td>
                                            {userData?.userImage && <td><img className='profile-image' src={`data:image/jpeg;base64,${userData.userImage}`} alt='profile-img' /></td>}
                                            {userData?.userImage == '' && <td><p>No Profile Image</p></td>}
                                            <td><button className="button" onClick={() => editUser(userData)}>Edit</button></td>
                                            <td><button className="button" onClick={() => deleteUser(userData.userId)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <AddUserForm formType={"add"} isAdmin={true} updateUserList={updateUserList} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
