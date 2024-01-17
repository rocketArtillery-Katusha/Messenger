import React from "react";
import { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import { setAuth } from "../../redux/auth-slice";
import { updateUserInfo } from "../../http/features/user-features";
import { months, years, genders } from "../../InfoToFil";
import { useDispatch } from "react-redux";

const ChangeUserInfo = ({ user, toggleChangeUserInfo }) => {
    const [updateUser, setUpdateUser] = useState({ ...user });
    const [infoToFill, setInfoToFill] = useState({
        months,
        years,
        genders,
        days: null,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (updateUser.userInfo.dateOfBirth.year && updateUser.userInfo.dateOfBirth.month) {
            const findMonth = months.find((month) => month.month === updateUser.userInfo.dateOfBirth.month);

            if (updateUser.userInfo.dateOfBirth.year % 4 === 0 && findMonth.month === "Февраля") {
                const days = Array.from({ length: findMonth.days + 1 }, (a, i) => ++i);
                console.log(days);
                setInfoToFill((data) => {
                    return { ...data, days };
                });
            } else {
                const days = Array.from({ length: findMonth.days }, (a, i) => ++i);
                setInfoToFill((data) => {
                    return { ...data, days };
                });
            }
        }
    }, [updateUser]);

    const acceptChanges = async () => {
        const formData = new FormData();
        formData.append("day", updateUser.userInfo.dateOfBirth.day);
        formData.append("month", updateUser.userInfo.dateOfBirth.month);
        formData.append("year", updateUser.userInfo.dateOfBirth.year);
        formData.append("gender", updateUser.userInfo.gender);
        formData.append("hometown", updateUser.userInfo.hometown);
        formData.append("profileStatus", updateUser.userInfo.profileStatus);
        formData.append("userImg", updateUser.userInfo.userImg);

        try {
            const { data } = await updateUserInfo(formData);

            dispatch(setAuth(data));
            toggleChangeUserInfo();
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <>
            <div className="container__user-img">
                <div>
                    <img
                        src={
                            typeof updateUser.userInfo.userImg === "string"
                                ? `${process.env.REACT_APP_BACKEND_BASE_URL}/${updateUser.userInfo.userImg}`
                                : URL.createObjectURL(updateUser.userInfo.userImg)
                        }
                        alt={updateUser.userInfo.userImg}
                    />
                    <div className="hover-overlay__user-img">
                        <input
                            type="file"
                            onChange={(e) =>
                                setUpdateUser({
                                    ...updateUser,
                                    userInfo: { ...updateUser.userInfo, userImg: e.target.files[0] },
                                })
                            }
                        />
                    </div>
                </div>
                <div className="profile__menu">
                    <Button cb={acceptChanges} value="Принять" />
                    <Button cb={toggleChangeUserInfo} value="Отмена" />
                </div>
            </div>
            <div className="profile__user-info">
                <div className="profile__username">
                    {updateUser.firstName} {updateUser.lastName}
                </div>
                <ul className="user-info__list">
                    <li className="user-info__item">
                        Дата рождения:
                        <div className="container-user-info__selection">
                            <div className="selection">
                                День:
                                <div className="container__selection-value">
                                    <span>{updateUser.userInfo.dateOfBirth.day}</span>
                                    <div className="selection-value">
                                        {infoToFill.days?.map((day) => (
                                            <span
                                                key={day}
                                                onClick={() =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        userInfo: {
                                                            ...updateUser.userInfo,
                                                            dateOfBirth: {
                                                                ...updateUser.userInfo.dateOfBirth,
                                                                day,
                                                            },
                                                        },
                                                    })
                                                }
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="selection">
                                Месяц:
                                <div className="container__selection-value">
                                    <span>{updateUser.userInfo.dateOfBirth.month}</span>
                                    <div className="selection-value">
                                        {infoToFill.months.map(({ month }) => (
                                            <span
                                                key={month}
                                                onClick={() => {
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        userInfo: {
                                                            ...updateUser.userInfo,
                                                            dateOfBirth: {
                                                                ...updateUser.userInfo.dateOfBirth,
                                                                month,
                                                            },
                                                        },
                                                    });

                                                    updateUser.userInfo.dateOfBirth.day &&
                                                        setUpdateUser((data) => {
                                                            return {
                                                                ...data,
                                                                userInfo: {
                                                                    ...data.userInfo,
                                                                    dateOfBirth: {
                                                                        ...data.userInfo.dateOfBirth,
                                                                        day: null,
                                                                    },
                                                                },
                                                            };
                                                        });
                                                }}
                                            >
                                                {month}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="selection">
                                Год:
                                <div className="container__selection-value">
                                    <span>{updateUser.userInfo.dateOfBirth.year}</span>
                                    <div className="selection-value">
                                        {infoToFill.years.map((year) => (
                                            <span
                                                key={year}
                                                onClick={() =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        userInfo: {
                                                            ...updateUser.userInfo,
                                                            dateOfBirth: {
                                                                ...updateUser.userInfo.dateOfBirth,
                                                                year,
                                                            },
                                                        },
                                                    })
                                                }
                                            >
                                                {year}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="user-info__item">
                        Пол:
                        <div className="container-user-info__selection">
                            <div className="selection">
                                Мужской/Женский
                                <div className="container__selection-value">
                                    <span>{updateUser.userInfo.gender}</span>
                                    <div className="selection-value">
                                        {infoToFill.genders.map((gender) => (
                                            <span
                                                key={gender}
                                                onClick={() =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        userInfo: {
                                                            ...updateUser.userInfo,
                                                            gender,
                                                        },
                                                    })
                                                }
                                            >
                                                {gender}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="user-info__item">
                        <h3>Родной город:</h3>

                        <div className="container-user-info__input">
                            <input
                                type="text"
                                value={updateUser.userInfo.hometown}
                                onChange={(e) =>
                                    setUpdateUser({
                                        ...updateUser,
                                        userInfo: {
                                            ...updateUser.userInfo,
                                            hometown: e.target.value,
                                        },
                                    })
                                }
                                placeholder="Город"
                            />
                        </div>
                    </li>
                    <li className="user-info__item">
                        <h2 className="user-info__status">Статус:</h2>
                        <div className="container-user-info__input">
                            <textarea
                                value={updateUser.userInfo.profileStatus}
                                onChange={(e) =>
                                    setUpdateUser({
                                        ...updateUser,
                                        userInfo: {
                                            ...updateUser.userInfo,
                                            profileStatus: e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ChangeUserInfo;
