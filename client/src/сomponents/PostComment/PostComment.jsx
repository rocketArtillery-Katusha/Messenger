import React from 'react';
import { useEffect, useState } from 'react';
import { formatDate } from "../../utils/formatDate";
import './post-comment.css';

const PostComment = ({ comment }) => {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(formatDate(comment.createdAt));
    }, [comment.createdAt]);
    return (
        <div className="container__comment">
            <div className="comment__header">
                <div className='comment__img-author'>
                    <img src={comment.userImg} alt="user-img" />
                </div>
                <div className="comment__meta">
                    <div className='comment__author'>{comment.firstName} {comment.lastName}</div>
                    <div className="comment__data">{date}</div>
                </div>
            </div>
            <div className="comment__main-text">{comment.comment}</div>
        </div>
    )
}

export default PostComment