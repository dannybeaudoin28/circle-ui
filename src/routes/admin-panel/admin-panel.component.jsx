import './admin-panel.styles.css';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useState } from 'react';
import AddUserForm from '../../components/forms/add-user-form.component/add-user-form.component';

import Modal from 'react-modal';
import EditUserForm from '../../components/forms/add-user-form.component/edit-user-form.component/edit-user-form.component';

const AdminPanel = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    const baseUrl = 'http://localhost:8888';

    const closeModal = () => {
        setIsOpen(false);
    };

    const editUser = (id) => {
        setUserId(id);
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
                    contentLabel="Example Modal"
                    userId={userId}
                >
                    <button onClick={closeModal}>Cancel</button>
                    <EditUserForm userId={userId}/>
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
                                        <td><button onClick={() => editUser(userData.userId)}>Edit</button></td>
                                        <td><button onClick={() => deleteUser(userData.userId)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <AddUserForm />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminPanel;
