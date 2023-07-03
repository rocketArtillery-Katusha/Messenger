import React from 'react';
import MessageError from '../MessageError/MessageError';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../../redux/features/authSlice';

const RegisterForm = ({ setChoiceFrom }) => {
    const [createUserData, setCreateUserData] = useState({ firstName: '', lastName: '', email: '', password1: '', password2: '' });
    const messageError = useSelector((state) => state.auth.message);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser(createUserData));
    };

    return (
        <div className="container__forms">
            <div className="auth__header">
                <h1>Регистрация</h1>
            </div>
            <form className='auth__content' onSubmit={handleSubmit}>
                <div className="auth__row">
                    <div className="auth__caption">Имя</div>
                    <div className="auth__input">
                        <input value={createUserData.firstName} onChange={(e) => setCreateUserData({ ...createUserData, firstName: e.target.value })} placeholder='Ваше имя...' type="text" />
                    </div>
                </div>
                <div className="auth__row">
                    <div className="auth__caption">Фамилия</div>
                    <div className="auth__input">
                        <input value={createUserData.lastName} onChange={(e) => setCreateUserData({ ...createUserData, lastName: e.target.value })} placeholder='Ваша фамилия...' type="text" />
                    </div>
                </div>
                <div className="auth__row">
                    <div className="auth__caption">Email@</div>
                    <div className="auth__input">
                        <input value={createUserData.email} onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })} placeholder='Ваш адрес электронной почты...' type="text" />
                    </div>
                </div>
                <div className="auth__row">
                    <div className="auth__caption">Пароль</div>
                    <div className="auth__input">
                        <input value={createUserData.password1} onChange={(e) => setCreateUserData({ ...createUserData, password1: e.target.value })} placeholder='Придумайте пароль...' type="password" autoComplete="off" />
                    </div>
                </div>
                <div className="auth__row">
                    <div className="auth__caption">Повторите пароль</div>
                    <div className="auth__input">
                        <input value={createUserData.password2} onChange={(e) => setCreateUserData({ ...createUserData, password2: e.target.value })} placeholder='Повторите пароль...' type="password" autoComplete="off" />
                    </div>
                </div>
                {messageError && (
                    <div className="auth__row">
                        <MessageError messageError={messageError} />
                    </div>
                )}
                <div className="auth__row">
                    <div className="container-auth__row-btn">
                        <button onClick={() => setChoiceFrom(true)}>Уже есть аккаунт?</button>
                        <button type='submit'>Создать</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default RegisterForm