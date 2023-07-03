import React from 'react';
import LoginForm from '../../сomponents/LoginForm/LoginForm';
import { useState } from 'react';
import RegisterForm from '../../сomponents/RegisterForm/RegisterForm';
import './auth-page.css';

const AuthPage = () => {
    const [choiceForm, setChoiceFrom] = useState(true)
    return (
        <div className='container__auth'>
            {choiceForm ? (<LoginForm setChoiceFrom={setChoiceFrom} />) : (<RegisterForm setChoiceFrom={setChoiceFrom} />)}
        </div>
    )
}

export default AuthPage