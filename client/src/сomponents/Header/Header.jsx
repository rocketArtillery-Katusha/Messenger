import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className='header__inner'>
            <a href="0" className='logo'>Messenger</a>
            <ul className="header__menu">
                <li><a href='0'>Сообщения</a></li>
                <li><a href='0'>Друзья</a></li>
                <li><a href='0'>Фотографии</a></li>
                <li><a href='0'>Профиль</a></li>
            </ul>
        </div>
    )
}

export default Header