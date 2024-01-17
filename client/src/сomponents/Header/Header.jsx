import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="header__inner">
            <Link to="/" className="logo">
                Messenger
            </Link>
            <ul className="header__menu">
                <li>
                    <Link to="/conversations">Сообщения</Link>
                </li>
                <li>
                    <Link to="/friends">Друзья</Link>
                    {user?.friendRequests.length > 0 && <div className="counter">{user?.friendRequests.length}</div>}
                </li>
                <li>
                    <Link to="/profile">Профиль</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
