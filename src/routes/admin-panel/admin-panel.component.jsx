import './admin-panel.styles.css';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useState } from 'react';
import AddUserForm from '../../components/forms/add-user-form.component/add-user-form.component';

import Modal from 'react-modal';

const AdminPanel = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});

    const baseUrl = 'http://localhost:8888';

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
        console.log('inside deleteUser' + id)
        axios.delete(baseUrl + '/users/delete-user/' + id)
            .then(response => {
                console.log(`Deleted post with ID ${id}`);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['userData'],
        queryFn: () =>
            fetch(baseUrl + '/users/get-users').then((res) =>
                res.json(),
            ),
    });

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit User Modal"
                    userId={userId}
                    user={user}
                >
                    <button onClick={closeModal}>Cancel</button>
                    <AddUserForm closeModal={closeModal} userId={userId} userData={user} formType="edit" />
                </Modal>
            </div>
            <div>
                <div className='content'>
                    <div>
                        <h1>Users:</h1>
                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Middle Initial</th>
                                    <th>Last Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((userData) => (
                                    <tr key={userData.userId}>
                                        <td>{userData.userId}</td>
                                        <td>{userData.userEmail}</td>
                                        <td>{userData.userFName}</td>
                                        <td>{userData.userMiddleInitial}</td>
                                        <td>{userData.userLName}</td>
                                        <td><button onClick={() => editUser(userData)}>Edit</button></td>
                                        <td><button onClick={() => deleteUser(userData.userId)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <AddUserForm formType={"add"}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminPanel;