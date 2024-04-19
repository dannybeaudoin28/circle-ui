import FriendCard from '../friend-card.component/friend-card.component';
import './friends.styles.scss';

const FriendsComponent = ({ friends }) => {
    console.log('friend: ', friends[0].friendUser);
    return (
        <div className='friends-container'>
            <h1 className='friends-heading'>Friends</h1>
            <ul className='friends-list'>
                {friends && friends.map((friend) => (
                    <li key={friend.id} className='friends-item'>
                        <FriendCard friend={friend} />
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default FriendsComponent;