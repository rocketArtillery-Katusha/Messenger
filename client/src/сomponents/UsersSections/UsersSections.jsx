import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAuth } from "../../redux/auth-slice";
import { getUsersOrUser } from "../../redux/user-slice";
import { toggleFrined } from "../../http/features/user-features";
import socketInit from "../../socket/socket";
import actions from "../../socket/actions";
import "./users-sections.css";

const UsersSections = ({ user, cb, friendRequests }) => {
    const socket = socketInit();
    const dispatch = useDispatch();

    const [users, setUsers] = useState(null);

    const submitToggleFriend = async (userId) => {
        try {
            const { data } = await toggleFrined(userId);

            dispatch(setAuth({ user: { ...data.user } }));
            dispatch(getUsersOrUser({ otherUser: { ...data.otherUser } }));
            socket.emit(actions.TOGGLE_FRIEND, data);
        } catch (err) {
            console.log(err);
        }
    };

    const getUsers = useCallback(async () => {
        try {
            const { data } = await cb();

            dispatch(getUsersOrUser(data));

            setUsers(...Object.values(data));
        } catch (err) {
            console.log(err.response.data);
        }
    }, [cb, dispatch]);

    useEffect(() => {
        if (user) {
            getUsers();
        }
    }, [getUsers, user]);

    return (
        <ul>
            {users?.map((user) => (
                <li key={user.id} className="container__user">
                    <Link to={`/profile/${user.id}`}>
                        <div className="user-data">
                            <img
                                src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user.userInfo.userImg}`}
                                alt="user.userInfo.userImg"
                            />
                            <div className="user-name">
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                    </Link>
                    {friendRequests && <button onClick={() => submitToggleFriend(user.id)}>Принять</button>}
                </li>
            ))}
        </ul>
    );
};

export default UsersSections;
