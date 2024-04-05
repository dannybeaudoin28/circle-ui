import './admin-panel.styles.css';
import { useQuery } from '@tanstack/react-query';

const AdminPanel = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['userData'],
        queryFn: () =>
            fetch('http://localhost:8888/users/get-users').then((res) =>
                res.json(),
            ),
    });

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className='testing'>
            <h1>Users:</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Middle Initial</th>
                        <th>Last Name</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
