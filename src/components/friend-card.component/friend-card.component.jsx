import './friend-card.styles.scss';

const FriendCard = ({ friend }) => {
    return (
        <a href={`/friend-page/${friend?.friendUser.userId}`}>
            <div className='container'>
                <div className='friend-card-container'>
                    <div className='friend-card'>
                        <div className='friend-card-left'>
                            <p>{friend?.friendUser.userFName} {friend?.friendUser.userMiddleInitial} {friend?.friendUser.userLName}</p>
                            <p>{friend?.friendUser.userEmail}</p>
                        </div>
                    </div>
                    <div className='friend-card-right'>
                        {friend?.friendUser.userImage && <img className='profile-image' src={`data:image/jpeg;base64,${friend?.friendUser.userImage}`} alt='profile-img' />}
                    </div>
                </div>
            </div>
        </a>

    );
}

export default FriendCard;