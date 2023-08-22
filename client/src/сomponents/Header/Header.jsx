import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';

const Header = () => {
    const me = useSelector((state) => state.auth.me);

    return (
        <div className='header__inner'>
            <Link to='/' className='logo'>Messenger</Link>
            <ul className="header__menu">
                <li><Link to='/messages'>Сообщения</Link></li>
                <li>
                    <Link to='/friends'>Друзья</Link>
                    {me.friendRequests.length > 0 && (<div className='counter'>{me.friendRequests.length}</div>)}
                </li>
                <li><Link to='/profile'>Профиль</Link></li>
            </ul>
        </div>
    )
}

export default Header