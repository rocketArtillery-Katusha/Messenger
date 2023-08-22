import React from 'react';
import { Link } from 'react-router-dom';

const ConversationUser = ({ user, conversationId, currentUserId }) => {

    return (
        <li className="container__user">
            <Link to={`${conversationId}`}>
                <div className='user-data'>
                    <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user.userInfo.userImg}`} alt={user.userInfo.userImg} />
                    <div className='user-name'>{user.firstName} {user.lastName}</div>
                </div>
            </Link>
        </li>
    )
}

export default ConversationUser