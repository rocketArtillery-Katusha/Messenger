import React from "react";
import Button from "../../UI/Button/Button";

const UserInfo = ({ user, logout, toggleChangeUserInfo }) => {
    return (
        <>
            <div className="container__user-img">
                <img
                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user.userInfo.userImg}`}
                    alt={user.userInfo.userImg}
                />
                <div className="profile__menu">
                    <Button cb={toggleChangeUserInfo} value="Изменить" />
                    <Button cb={logout} value="Выйти" />
                </div>
            </div>
            <div className="profile__user-info">
                <div className="profile__username">
                    {user?.firstName} {user?.lastName}
                </div>
                <ul className="user-info__list">
                    <li className="user-info__item">
                        Дата рождения:
                        <span>
                            {user.userInfo.dateOfBirth.day} {user.userInfo.dateOfBirth.month}{" "}
                            {user.userInfo.dateOfBirth.year}
                        </span>
                    </li>
                    <li className="user-info__item">
                        Пол:
                        <span>{user.userInfo.gender}</span>
                    </li>
                    <li className="user-info__item">
                        <h3>Родной город:</h3>
                        <span>{user.userInfo.hometown}</span>
                    </li>
                    <li className="user-info__item">
                        <h2 className="user-info__status">Статус:</h2>
                        <div className="user-info__text">{user.userInfo.profileStatus}</div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default UserInfo;
