import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getUsers } from "../../redux/features/actionUserSlice"
import "./frends-page.css";

const FrendsPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.actionsUsers.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <ul className='container-users'>
            {users?.map((user) => (
                <li className="container__user">
                    <Link to={`profile/${user?._id}`}>
                        <div className='user-data'>
                            <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${user?.userInfo.userImg}`} alt='' />
                            <div className='user-name'>{user.firstName} {user.lastName}</div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default FrendsPage