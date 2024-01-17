import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../../http/features/conversation-features";
import { getUserById, toggleRequestFriend, toggleFrined } from "../../../http/features/user-features";
import { getUserPosts } from "../../../http/features/post-features";
import { getUsersOrUser } from "../../../redux/user-slice";
import { getPostsOrPost } from "../../../redux/post-slice";
import { setAuth } from "../../../redux/auth-slice";
import Post from "../../../сomponents/Post/Post";
import Button from "../../../UI/Button/Button";
import socketInit from "../../../socket/socket";
import actions from "../../../socket/actions";

const UserProfile = ({ userId }) => {
    const [checks, setChecks] = useState({ checkOnFriend: null, checkOnRequest: null });
    const { otherUser } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = socketInit();

    const submitCreateConversation = async () => {
        try {
            const { data } = await createConversation(userId);

            navigate(`/conversations/${data.conversationId}`);
        } catch (error) {
            console.log(error);
        }
    };

    const submitToggleRequestFriend = async () => {
        try {
            const { data } = await toggleRequestFriend(userId);

            dispatch(getUsersOrUser(data));
            socket.emit(actions.TOGGLE_REQUEST, data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitToggleFriend = async () => {
        try {
            const { data } = await toggleFrined(userId);

            dispatch(setAuth({ user: { ...data.user } }));
            dispatch(getUsersOrUser({ otherUser: { ...data.otherUser } }));
            socket.emit(actions.TOGGLE_FRIEND, data);
        } catch (err) {
            console.log(err);
        }
    };

    const getUser = useCallback(async () => {
        try {
            const { data } = await getUserById(userId);

            dispatch(getUsersOrUser(data));
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, userId]);

    const getPosts = useCallback(async () => {
        try {
            const { data } = await getUserPosts(userId);

            dispatch(getPostsOrPost(data));
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, userId]);

    useEffect(() => {
        getUser();
        getPosts();
    }, [getUser, getPosts]);

    useEffect(() => {
        if (user && otherUser) {
            setChecks(() => {
                const findFriend = user.friends.find((friendId) => friendId === otherUser.id);
                const findRequest = otherUser.friendRequests.find((sendreId) => sendreId === user.id);
                return { checkOnFriend: findFriend, checkOnRequest: findRequest };
            });
        }
    }, [user, otherUser]);

    return (
        <>
            <form className="profile" onSubmit={(e) => e.preventDefault()}>
                <div className="container__user-img">
                    <div>
                        <img
                            src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${otherUser?.userInfo.userImg}`}
                            alt={otherUser?.userInfo.userImg}
                        />
                    </div>
                    <div className="profile__menu">
                        {checks.checkOnFriend ? (
                            <Button cb={submitToggleFriend} value={"Удалить"} />
                        ) : checks.checkOnRequest ? (
                            <Button cb={submitToggleRequestFriend} value={"Отписаться"} />
                        ) : (
                            <Button cb={submitToggleRequestFriend} value={"Добавить"} />
                        )}
                        <Button cb={submitCreateConversation} value={"Написать"} />
                    </div>
                </div>
                <div className="profile__user-info">
                    <div className="profile__username">
                        {otherUser?.firstName} {otherUser?.lastName}
                    </div>
                    <ul className="user-info__list">
                        <li className="user-info__item">
                            Дата рождения:
                            <span>
                                {otherUser?.userInfo.dateOfBirth.day} {otherUser?.userInfo.dateOfBirth.month}
                                {otherUser?.userInfo.dateOfBirth.year}
                            </span>
                        </li>
                        <li className="user-info__item">
                            Пол: <span>{otherUser?.userInfo.gender}</span>
                        </li>
                        <li className="user-info__item">
                            <h3>Родной город:</h3>
                            <span>{otherUser?.userInfo.hometown}</span>
                        </li>
                        <li className="user-info__item">
                            <h2 className="user-info__status">Статус:</h2>
                            <div className="user-info__text">{otherUser?.userInfo.profileStatus}</div>
                        </li>
                    </ul>
                </div>
            </form>
            <ul className="post-container__list">
                {posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </ul>
        </>
    );
};

export default UserProfile;
