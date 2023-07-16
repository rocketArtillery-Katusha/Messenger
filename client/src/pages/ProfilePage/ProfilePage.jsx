import React from 'react';
import { useParams } from 'react-router-dom';
import MyProfile from '../../сomponents/MyProfile/MyProfile';
import UserProfile from '../../сomponents/UserProfile/UserProfile';
import './profile-page.css';

const ProfilePage = () => {
    const params = useParams();

    return (
        <div className='container__profile'>
            {params.id ? (<UserProfile userId={params.id} />) : (<MyProfile />)}
        </div >
    );
}

export default ProfilePage;