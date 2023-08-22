import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../redux/features/socketSlice';
import { useEffect } from 'react';
import ConversationUser from '../../сomponents/ConversationUser/ConversationUser';
import './messages-page.css';

const MessagesPage = () => {
    const dispatch = useDispatch()
    const me = useSelector((state) => state.auth.me);
    const conversations = useSelector((state) => state.socket.conversations);

    useEffect(() => {
        dispatch(getConversations());
    }, [dispatch]);

    return (
        <div className='container-conversations'>
            <div className='conversations'>
                <ul>
                    {conversations?.map((data) => <ConversationUser key={data.conversation._id} user={data.user} conversationId={data.conversation._id} currentUserId={me?._id} />)}
                </ul>
            </div>
        </div>
    )
}

export default MessagesPage