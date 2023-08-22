import React from 'react';
import './conversation-page.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { createConversationMessage, getConversationMessages, updateMessageState } from '../../redux/features/socketSlice';
import { socketContext } from '../../utils/socketContext';

const ConversationPage = () => {
    const [receiverId, setReceiverId] = useState(null)
    const messages = useSelector((state) => state.socket.messages);
    const me = useSelector((state) => state.auth.me);
    const params = useParams();
    const dispatch = useDispatch();
    const socket = useContext(socketContext);
    const [messageData, setMessageData] = useState({
        conversationId: params.id,
        senderId: me?._id,
        firstName: me?.firstName,
        lastName: me?.lastName,
        userImg: me.userInfo.userImg,
        text: ''
    });


    useEffect(() => {
        socket.current?.emit('joinConversation', params.id);
        // socket.current = io("ws://localhost:8900");
        // socket.current?.on("getMessage", (data) => {
        //     console.log(data);
        //     // dispatch(updateMessageState(data))
        // });
        // dispatch(getConversationMessages(params.id));
    }, [socket]);

    // useEffect(() => {
    //     socket.current.on('getUsers', (data) => {
    //         const users = data.map((el) => el.userId).find((el) => el !== me?._id);
    //         setReceiverId(users)
    //     })
    // }, [me]);

    // useEffect(() => {
    //     socket.current.emit('addUser', me?._id);
    // }, [me])

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.current?.emit('sendMessage', { messageData, receiverId })
        // dispatch(createConversationMessage(messageData))
    }

    return (
        <form onSubmit={handleSubmit} className='chat-container'>
            <div className='chat'>
                {messages?.map((message) => (
                    <div key={message._id} className={message?.senderId === me?._id ? 'message__container myMessage' : 'message__container'}>
                        {message?.senderId === me?._id ? (
                            <div className="message-container__inner">
                                <div className='message'>
                                    {message.text}
                                </div>
                                <img style={{ "marginRight": 0, "marginLeft": 10 }} src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${message.userImg}`} alt={message.userImg} />
                            </div>
                        ) : (
                            <div className="message-container__inner">
                                <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${message.userImg}`} alt={message.userImg} />
                                <div className='message'>
                                    {message.text}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <input type="text" placeholder='send' value={messageData.text} onChange={(e) => setMessageData({ ...messageData, text: e.target.value })} />
        </form>
    )
}

export default ConversationPage