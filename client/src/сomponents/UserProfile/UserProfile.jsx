import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createConversation, getConversations } from '../../redux/features/socketSlice';
import { getPostsById } from '../../redux/features/postSlice';
import { getUserById, deleteFriend, cancelFriendRequest, sendFriendRequest } from '../../redux/features/authSlice';
import { useEffect, useState, useContext } from 'react';
import { socketContext } from '../../utils/socketContext';
import { Link } from 'react-router-dom';
import Post from '../Post/Post';

const UserProfile = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const me = useSelector((state) => state.auth.me);
    const conversations = useSelector((state) => state.socket.conversations);
    const userPosts = useSelector((state) => state.post.posts);
    const [checkMyRequest, setCheckMyRequest] = useState(null);
    const [checkConversation, setCheckConversation] = useState(null);
    const [checkFriend, setCheckFriend] = useState(null);
    const socket = useContext(socketContext);

    const handleSubmit = (typeAction) => {
        switch (typeAction) {
            case 'DELETE':
                socket.current?.emit('deleteFriend', { me, user });
                dispatch(deleteFriend(user?._id));
                break;

            case 'UNSCRIBE':
                socket.current?.emit('cancleRequest', { me, user });
                dispatch(cancelFriendRequest(user?._id));
                break;

            case 'SENDREQUEST':
                socket.current?.emit('requestFriend', { me, user })
                dispatch(sendFriendRequest(user?._id));
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (user) {
            const findFriend = user.friends.find((userId) => userId === me?._id);
            const findMyRequest = user.friendRequests.find((userId) => userId === me?._id);
            setCheckFriend(findFriend);
            setCheckMyRequest(findMyRequest);
        }
        if (conversations) {
            const findConversation = conversations.find((conversation) => conversation.members.find((userId) => userId === user?._id));
            setCheckConversation(findConversation);
        }

    }, [user, me, conversations]);

    useEffect(() => {
        dispatch(getConversations(me._id));
        dispatch(getUserById(userId));
        dispatch(getPostsById(userId));
    }, [dispatch, userId, me]);

    return (
        <>
            <form className="profile" onSubmit={(e) => e.preventDefault()}>
                <div className="container__user-img">
                    <div>
                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user?.userInfo.userImg}`} alt={user?.userInfo.userImg} />
                    </div>
                    <div className="profile__menu">
                        {checkFriend ? (
                            <button onClick={() => handleSubmit('DELETE')}>Удалить</button>
                        ) : checkMyRequest ? (
                            <button onClick={() => handleSubmit('UNSCRIBE')}>Отписаться</button>
                        ) : (
                            <button onClick={() => handleSubmit('SENDREQUEST')}>Добавить</button>
                        )}
                        {checkConversation ? (
                            <Link to={`/messages/${checkConversation._id}`}>
                                <button>Написать</button>
                            </Link>
                        ) : (
                            <button onClick={() => dispatch(createConversation(user?._id))}>Написать</button>
                        )}
                    </div>
                </div>
                <div className="profile__user-info">
                    <div className="profile__username">{user?.firstName} {user?.lastName}</div>
                    <ul className="user-info__list">
                        <li className="user-info__item">
                            Дата рождения: <span>{user?.userInfo.dateOfBirth.day} {user?.userInfo.dateOfBirth.month} {user?.userInfo.dateOfBirth.year}</span>
                        </li>
                        <li className="user-info__item">
                            Пол: <span>{user?.userInfo.gender}</span>
                        </li>
                        <li className="user-info__item">
                            <h3>Родной город:</h3>
                            <span>{user?.userInfo.hometown}</span>
                        </li>
                        <li className="user-info__item">
                            <h2 className='user-info__status'>Статус:</h2>
                            <div className='user-info__text'>{user?.userInfo.profileStatus}</div>
                        </li>
                    </ul>
                </div>
            </form >
            <ul className='post-container__list'>
                {userPosts?.map((post) => (
                    <Post key={post._id} postData={post} />
                ))}
            </ul>
        </>
    )
}

export default UserProfile