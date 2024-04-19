import './friend-card.styles.scss';

const FriendCard = ({ friend }) => {
    console.log(friend?.friendUser.userEmail);
    return (
        <div>
            <p>{friend?.friendUser.userFName} {friend?.friendUser.userMiddleInitial} {friend?.friendUser.userLName}</p>
            <p>{friend?.friendUser.userEmail}</p>
            <hr/>
        </div>
    );
}

export default FriendCard;