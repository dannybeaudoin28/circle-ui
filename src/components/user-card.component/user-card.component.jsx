import './user-card.styles.scss';

const UserCard = ({ user }) => {

    return (
        <a href={`/friend-page/${user?.userId}`}>
            <div className='container'>
                <div className='friend-card-container'>
                    <div className='friend-card'>
                        <div className='friend-card-left'>
                            <p>{user?.userFName} {user?.userMiddleInitial} {user?.userLName}</p>
                            <p>{user?.userEmail}</p>
                        </div>
                    </div>
                    <div className='friend-card-right'>
                        {user?.userImage && <img className='profile-image' src={`data:image/jpeg;base64,${user?.userImage}`} alt='profile-img' />}
                    </div>
                </div>
            </div>
        </a>
    );
}

export default UserCard;