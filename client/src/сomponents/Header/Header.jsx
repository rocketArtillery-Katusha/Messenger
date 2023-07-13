import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => {
    return (
        <div className='header__inner'>
            <Link to='/' className='logo'>Messenger</Link>
            <ul className="header__menu">
                <li><Link to='messages'>Сообщения</Link></li>
                <li><Link to='frends'>Друзья</Link></li>
                <li><a href='0'>Фотографии</a></li>
                <li><Link to='/profile'>Профиль</Link></li>
            </ul>
        </div>
    )
}

export default Header