import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/features/authSlice';
import { useEffect, useState } from 'react';
import { getMyPosts } from '../../redux/features/postSlice';
import { updateUserInfo } from '../../redux/features/authSlice';
import Post from '../Post/Post'

const MyProfile = () => {
    const me = useSelector((state) => state.auth.me);
    const postsData = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();

    const [changeUserInfo, setChangeUserInfo] = useState(false);
    const [userData, setUserData] = useState({
        day: me?.userInfo.dateOfBirth.day,
        month: me?.userInfo.dateOfBirth.month,
        year: me?.userInfo.dateOfBirth.year,
        gender: me?.userInfo.gender,
        hometown: me?.userInfo.hometown,
        profileStatus: me?.userInfo.profileStatus,
        userImg: `${process.env.REACT_APP_BACKEND_BASE_URL}/${me?.userInfo.userImg}`
    });

    const [selectionsData, setSelectionsData] = useState({
        monthsData: [
            { month: "Января", days: 31 },
            { month: "Февраля", days: 28 },
            { month: "Марта", days: 31 },
            { month: "Апреля", days: 30 },
            { month: "Мая", days: 31 },
            { month: "Июня", days: 30 },
            { month: "Июля", days: 31 },
            { month: "Августа", days: 31 },
            { month: "Сентября", days: 30 },
            { month: "Октября", days: 31 },
            { month: "Ноября", days: 30 },
            { month: "Декабря", days: 31 },
        ],
        years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
        daysArray: null,
        genders: ["Мужской", "Женский"]
    });

    const handleSubmit = () => {
        const data = new FormData();
        data.append('day', userData.day);
        data.append('month', userData.month);
        data.append('year', userData.year);
        data.append('gender', userData.gender);
        data.append('hometown', userData.hometown);
        data.append('profileStatus', userData.profileStatus);
        data.append('userImg', userData.userImg);
        dispatch(updateUserInfo(data));
        setChangeUserInfo(false);
    };

    const undoСhanges = () => {
        setChangeUserInfo(false);
        setUserData({
            day: me.userInfo.dateOfBirth.day,
            month: me.userInfo.dateOfBirth.month,
            year: me.userInfo.dateOfBirth.year,
            gender: me.userInfo.gender,
            hometown: me.userInfo.hometown,
            profileStatus: me.userInfo.profileStatus,
            userImg: `${process.env.REACT_APP_BACKEND_BASE_URL}/${me.userInfo.userImg}`
        });
    };

    const hendleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        window.location.reload();
    };

    useEffect(() => {
        if (userData.month) {
            const getDays = selectionsData.monthsData.find((months) => months.month === userData.month).days;
            const daysArray = [];
            for (let i = 1; i <= getDays; i++) {
                daysArray.push(i);
            }
            setSelectionsData((selectionsData) => {
                const obj = { ...selectionsData, daysArray };
                return obj;
            });
        }

        if (userData.month === "Февраля" && userData.year % 4 === 0) {
            const getDays = selectionsData.monthsData.find((months) => months.month === userData.month).days + 1;
            const daysArray = [];
            for (let i = 1; i <= getDays; i++) {
                daysArray.push(i);
            }
            setSelectionsData((selectionsData) => {
                const obj = { ...selectionsData, daysArray };
                return obj;
            });
        }

        if (userData.day > selectionsData.daysArray?.length) {
            setUserData({ ...userData, day: null });
        }

        dispatch(getMyPosts());

    }, [dispatch, userData.month, userData.year, userData, selectionsData.daysArray?.length, selectionsData.monthsData]);


    return (
        <>
            <form className="profile" onSubmit={(e) => e.preventDefault()}>
                {changeUserInfo ? (
                    <div className="container__user-img">
                        <div>
                            <img src={typeof userData.userImg === 'string' ? userData.userImg : URL.createObjectURL(userData.userImg)} alt={userData.userImg} />
                            <div className="hover-overlay__user-img">
                                <input type="file" onChange={(e) => setUserData({ ...userData, userImg: e.target.files[0] })} />
                            </div>
                        </div>
                        <div className="profile__menu">
                            <button onClick={() => handleSubmit()}>Принять</button>
                            <button onClick={() => undoСhanges()}>Отмена</button>
                        </div>
                    </div>
                ) : (
                    <div className="container__user-img">
                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${me?.userInfo.userImg}`} alt={me?.userInfo.userImg} />
                        <div className="profile__menu">
                            <button onClick={() => setChangeUserInfo(true)}>Изменить</button>
                            <button onClick={() => hendleLogout()}>Выйти</button>
                        </div>
                    </div>
                )}
                <div className="profile__user-info">
                    <div className="profile__username">{me?.firstName} {me?.lastName}</div>
                    <ul className="user-info__list">
                        <li className="user-info__item">
                            Дата рождения: {changeUserInfo ? (
                                <div className='container-user-info__selection'>
                                    <div className="selection">
                                        День:
                                        <div className="container__selection-value">
                                            <span>{userData.day}</span>
                                            <div className='selection-value'>
                                                {selectionsData.daysArray?.map((day) => <span key={day} onClick={() => setUserData({ ...userData, day })}>{day}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="selection">
                                        Месяц:
                                        <div className="container__selection-value">
                                            <span>{userData.month}</span>
                                            <div className='selection-value'>
                                                {selectionsData.monthsData?.map((el) => <span key={el.month} onClick={() => setUserData({ ...userData, month: el.month })}>{el.month}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="selection">
                                        Год:
                                        <div className="container__selection-value">
                                            <span>{userData.year}</span>
                                            <div className='selection-value'>
                                                {selectionsData.years?.map((year) => <span key={year} onClick={() => setUserData({ ...userData, year })}>{year}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (<span>{userData.day} {userData.month} {userData.year}</span>)}
                        </li>
                        <li className="user-info__item">
                            Пол: {changeUserInfo ? (
                                <div className='container-user-info__selection'>
                                    <div className="selection">
                                        Мужской/Женский
                                        <div className="container__selection-value">
                                            <span>{userData.gender}</span>
                                            <div className='selection-value'>
                                                {selectionsData.genders.map((gender) => <span key={gender} onClick={() => setUserData({ ...userData, gender })}>{gender}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (<span>{userData.gender}</span>)}
                        </li>
                        <li className="user-info__item">
                            <h3>Родной город:</h3>
                            {changeUserInfo ? (
                                <div className="container-user-info__input">
                                    <input type="text" value={userData.hometown} onChange={(e) => setUserData({ ...userData, hometown: e.target.value })} placeholder="Город" />
                                </div>
                            ) : (<span>{userData.hometown}</span>)}

                        </li>
                        <li className="user-info__item">
                            <h2 className='user-info__status'>Статус:</h2>
                            {changeUserInfo ? (
                                <div className="container-user-info__input">
                                    <textarea value={userData.profileStatus} onChange={(e) => setUserData({ ...userData, profileStatus: e.target.value })} />
                                </div>
                            ) : (<div className='user-info__text'>{userData.profileStatus}</div>)}
                        </li>
                    </ul>
                </div>
            </form >
            <ul className='post-container__list'>
                {postsData?.map((el) => (
                    <Post key={el._id} postData={el} />
                ))}
            </ul>
        </>
    )
}

export default MyProfile