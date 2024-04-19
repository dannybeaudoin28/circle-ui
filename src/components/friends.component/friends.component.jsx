import FriendCard from '../friend-card.component/friend-card.component';
import './friends.styles.scss';

const FriendsComponent = ({ friends }) => {
    console.log('friend: ', friends[0].friendUser);
    return (
        <div>
            <h1>Friends</h1>
            <li>
                {friends.map((friend) => (
                    <ul><FriendCard friend={friend}/></ul>
                ))}
            </li>
        </div>
    )
};

export default FriendsComponent;