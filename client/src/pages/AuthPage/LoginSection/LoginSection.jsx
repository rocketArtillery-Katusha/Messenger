import React from "react";
import CaptionError from "../../../UI/CaptionError/CaptionError";
import Button from "../../../UI/Button/Button";
import TextInput from "../../../UI/TextInput/TextInput";
import Caption from "../../../UI/Caption/Caption";
import { useState } from "react";
import { setAuth } from "../../../redux/auth-slice";
import { login } from "../../../http/features/auth-features";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginSection = ({ setChoiceFrom }) => {
    const [loginUserData, setLoginUserData] = useState({
        email: "",
        password: "",
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
            const { data } = await login(loginUserData);

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
                <Caption value="Email@" />
                <TextInput
                    type="text"
                    state={loginUserData}
                    setState={setLoginUserData}
                    placeholder="Ваш адрес электронной почты..."
                    onChangeState="email"
                />
            </div>
            <div className="auth__row">
                <Caption value="Пароль" />
                <TextInput
                    type="password"
                    state={loginUserData}
                    setState={setLoginUserData}
                    placeholder="Введите пароль..."
                    onChangeState="password"
                />
            </div>
            {messageError && (
                <div className="auth__row">
                    <CaptionError messageError={messageError} />
                </div>
            )}
            <div className="auth__row">
                <div className="container-auth__row-btn">
                    <Button cb={handeleSubmit} value="Войти" />
                    <Button cb={changeForm} value="Регистрация" />
                </div>
            </div>
        </>
    );
};

export default LoginSection;
