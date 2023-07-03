import React from 'react';
import MessageError from '../MessageError/MessageError';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/features/authSlice';
import { useState } from 'react';

const LoginForm = ({ setChoiceFrom }) => {
    const [loginUserData, setLoginUserData] = useState({ email: '', password: '' });
    const messageError = useSelector((state) => state.auth.message);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginUserData));
    };

    return (
        <div className="container__forms">
            <div className="auth__header">
                <h1>Вход</h1>
            </div>
            <form className='auth__content' onSubmit={handleSubmit}>
                <div className="auth__row">
                    <div className="auth__caption">Email@</div>
                    <div className="auth__input">
                        <input value={loginUserData.email} onChange={(e) => setLoginUserData({ ...loginUserData, email: e.target.value })} placeholder='Ваш адрес электронной почты...' type="text" />
                    </div>
                </div>
                <div className="auth__row">
                    <div className="auth__caption">Пароль</div>
                    <div className="auth__input">
                        <input value={loginUserData.password} onChange={(e) => setLoginUserData({ ...loginUserData, password: e.target.value })} placeholder='Пароль...' type="password" autoComplete="off" />
                    </div>
                </div>
                {messageError && (
                    <div className="auth__row">
                        <MessageError messageError={messageError} />
                    </div>
                )}
                <div className="auth__row">
                    <div className="container-auth__row-btn">
                        <button type='submit'>Войти</button>
                        <button onClick={() => setChoiceFrom(false)}>Регистрация</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm