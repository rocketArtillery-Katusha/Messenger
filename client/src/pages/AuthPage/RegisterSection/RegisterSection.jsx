import React from "react";
import CaptionError from "../../../UI/CaptionError/CaptionError";
import Button from "../../../UI/Button/Button";
import TextInput from "../../../UI/TextInput/TextInput";
import Caption from "../../../UI/Caption/Caption";
import { useState } from "react";
import { setAuth } from "../../../redux/auth-slice";
import { register } from "../../../http/features/auth-features";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RegisterSection = ({ setChoiceFrom }) => {
    const [registerUserData, setRegisterUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const messageError = useSelector((state) => state.auth.message);

    const changeForm = () => {
        setChoiceFrom((state) => !state);
    };

    const handeleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register(registerUserData);

            if (data.user) {
                dispatch(setAuth(data.user));
                navigate("/main");
            }
        } catch (error) {
            dispatch(setAuth(error.response.data));
            console.log(error.response.data);
        }
    };

    return (
        <>
            <div className="auth__row">
                <Caption value="Имя" />
                <TextInput
                    type="text"
                    state={registerUserData}
                    setState={setRegisterUserData}
                    placeholder="Ваше имя..."
                    onChangeState="firstName"
                />
            </div>
            <div className="auth__row">
                <Caption value="Фамилия" />
                <TextInput
                    type="text"
                    state={registerUserData}
                    setState={setRegisterUserData}
                    placeholder="Ваша фамилия..."
                    onChangeState="lastName"
                />
            </div>
            <div className="auth__row">
                <Caption value="Email@" />
                <TextInput
                    type="text"
                    state={registerUserData}
                    setState={setRegisterUserData}
                    placeholder="Ваш адрес электронной почты..."
                    onChangeState="email"
                />
            </div>
            <div className="auth__row">
                <Caption value="Пароль" />
                <TextInput
                    type="password"
                    state={registerUserData}
                    setState={setRegisterUserData}
                    placeholder="Придумайте пароль..."
                    onChangeState="password1"
                />
            </div>
            <div className="auth__row">
                <Caption value="Повторите пароль" />
                <TextInput
                    type="password"
                    state={registerUserData}
                    setState={setRegisterUserData}
                    placeholder="Повторите пароль..."
                    onChangeState="password2"
                />
            </div>
            {messageError && (
                <div className="auth__row">
                    <CaptionError messageError={messageError} />
                </div>
            )}
            <div className="auth__row">
                <div className="container-auth__row-btn">
                    <Button cb={changeForm} value="Уже есть аккаунт?" />
                    <Button cb={handeleSubmit} value="Создать" />
                </div>
            </div>
        </>
    );
};

export default RegisterSection;
