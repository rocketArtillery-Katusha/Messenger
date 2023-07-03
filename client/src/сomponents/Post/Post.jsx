import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import PostWIndow from '../PostWindow/PostWIndow';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { likePost } from '../../redux/features/postSlice';
import './post.css';

const Post = ({ postData }) => {
    const [openPostWindow, setOpenPostWindow] = useState(false);
    const [date, setDate] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setDate(formatDate(postData.createdAt));
    }, [postData.createdAt]);

    const handleLike = () => {
        dispatch(likePost(postData._id));
    };

    return (
        <li className='post-container__item'>
            {openPostWindow ? (<PostWIndow setOpenPostWindow={setOpenPostWindow} postData={postData} />) : ''}
            <div className="post-item__header">
                <div className='post-item__img-author'>
                    <img src={postData.userImg} alt='user-img' />
                </div>
                <div className="post-item__meta">
                    <div className='post-item__author'>{postData.firstName} {postData.lastName}</div>
                    <div className="post-item__data">{date}</div>
                </div>
            </div>
            <div className="post-item__main">
                {postData.descPost && (<div className='post-item__desc'>{postData.descPost}</div>)}
                {postData.imgPost && (<img className='post-item__img' src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${postData.imgPost}`} alt="post-img" />)}
            </div>
            <ul className="post-item-menu__list">
                <li className='post-item-menu__item' onClick={handleLike}><AiOutlineHeart />{postData.likes.length}</li>
                <li className='post-item-menu__item' onClick={() => setOpenPostWindow(true)}><FaRegComment />{postData.comments.length}</li>
            </ul >
        </li >
    );
};

export default Post;