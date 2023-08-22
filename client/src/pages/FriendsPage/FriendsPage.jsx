import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUsersWhoSentFriendRequest, acceptFriend, getFriends, getUsers } from '../../redux/features/authSlice';
import { socketContext } from '../../utils/socketContext'
import "./friends-page.css";

const FriendsPage = () => {
    const [checkFrends, setCheckFrends] = useState(true);
    const dispatch = useDispatch();
    const socket = useContext(socketContext);
    const usersWhoSentFriendRequest = useSelector((state) => state.auth.usersWhoSentFriendRequest);
    const allUsers = useSelector((state) => state.auth.users);
    const me = useSelector((state) => state.auth.me);
    const myFriends = useSelector((state) => state.auth.friends);

    useEffect(() => {
        dispatch(getUsersWhoSentFriendRequest());
        dispatch(getUsers());
        dispatch(getFriends());
    }, [dispatch, checkFrends]);

    const handleSubmit = (user) => {
        socket.current?.emit('addFriend', { me, user });
        dispatch(acceptFriend(user?._id));
    }

    return (
        <div className='container-users'>
            {usersWhoSentFriendRequest.length > 0 && (
                <div>
                    <h1>Предложения в друзья</h1>
                    <ul>
                        {usersWhoSentFriendRequest.map((user) => (
                            <li key={user._id} className="container__user">
                                <Link to={`/profile/${user._id}`}>
                                    <div className='user-data'>
                                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user.userInfo.userImg}`} alt='' />
                                        <div className='user-name'>{user.firstName} {user.lastName}</div>
                                    </div>
                                </Link>
                                <button onClick={() => handleSubmit(user)}>Принять</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ul className='frends-page__menu'>
                <li onClick={() => setCheckFrends(true)}>Мои друзья</li>
                <li onClick={() => setCheckFrends(false)}>Люди</li>
            </ul>
            {checkFrends ? (
                <ul>
                    {myFriends?.map((friend) => (
                        <li key={friend._id} className="container__user">
                            <Link to={`/profile/${friend._id}`}>
                                <div className='user-data'>
                                    <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${friend.userInfo.userImg}`} alt='' />
                                    <div className='user-name'>{friend.firstName} {friend.lastName}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {allUsers?.map((user) => (
                        <li key={user._id} className="container__user">
                            <Link to={`/profile/${user._id}`}>
                                <div className='user-data'>
                                    <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user.userInfo.userImg}`} alt='' />
                                    <div className='user-name'>{user.firstName} {user.lastName}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FriendsPage