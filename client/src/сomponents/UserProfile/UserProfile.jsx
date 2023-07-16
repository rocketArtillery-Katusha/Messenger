import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/features/actionUserSlice';
import { getPostsById } from '../../redux/features/postSlice';
import { useEffect } from 'react';
import Post from '../Post/Post';

const UserProfile = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.actionsUsers.user);
    const userPosts = useSelector((state) => state.post.posts);

    useEffect(() => {
        dispatch(getUserById(userId));
        dispatch(getPostsById(userId));
    }, [dispatch, userId]);

    return (
        <>
            <form className="profile" onSubmit={(e) => e.preventDefault()}>
                <div className="container__user-img">
                    <div>
                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user?.userInfo.userImg}`} alt={user?.userInfo.userImg} />
                    </div>
                    <div className="profile__menu">
                        <button>Добавить</button>
                        <button>Написать</button>
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