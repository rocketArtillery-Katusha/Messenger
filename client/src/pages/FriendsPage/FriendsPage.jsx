import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getUsers, getFriends, getSendersRequestFriend } from "../../http/features/user-features";
import UsersSections from "../../сomponents/UsersSections/UsersSections";
import "./friends-page.css";

const FriendsPage = () => {
    const [checkFrends, setCheckFrends] = useState(true);
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="container-users">
            {user?.friendRequests.length > 0 && (
                <div>
                    <h1>Предложения в друзья</h1>
                    <UsersSections user={user} cb={getSendersRequestFriend} friendRequests={true} />
                </div>
            )}
            <ul className="frends-page__menu">
                <li onClick={() => setCheckFrends(true)}>Мои друзья</li>
                <li onClick={() => setCheckFrends(false)}>Люди</li>
            </ul>
            {checkFrends ? <UsersSections user={user} cb={getFriends} /> : <UsersSections user={user} cb={getUsers} />}
        </div>
    );
};

export default FriendsPage;
