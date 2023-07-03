import React from 'react';
import { MdClose } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../utils/formatDate';
import { createComment, getComments, likePost } from '../../redux/features/postSlice';
import PostComment from '../PostComment/PostComment';
import './post-window.css';

const PostWIndow = ({ setOpenPostWindow, postData }) => {
    const [commentData, setCommentData] = useState({ comment: '', postId: postData._id });
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.post.comments);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment(commentData));
        setCommentData({ comment: '', postId: postData._id });
    };

    const handleLike = () => {
        dispatch(likePost(postData._id));
    };

    useEffect(() => {
        dispatch(getComments(postData._id));
        setDate(formatDate(postData.createdAt));
    }, [postData.createdAt, postData._id, dispatch]);

    return (
        <div className='post__blur' onClick={() => setOpenPostWindow(false)}>
            {postData.imgPost ? (
                <div className='post-container' onClick={(e) => e.stopPropagation()}>
                    <div className='container-cross' onClick={() => setOpenPostWindow(false)}>
                        <MdClose className="cross" />
                    </div>
                    <div className='post-container__img'>
                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${postData.imgPost}`} alt="post-img__inner" />
                    </div>
                    <aside className='post__sidebar'>
                        <div className="post-container__inner">
                            <div className="post__header">
                                <div className='post__img-author'>
                                    <img src={postData.userImg} alt="user-img" />
                                </div>
                                <div className="post-item__meta">
                                    <div className='post__author'>{postData.firstName} {postData.lastName}</div>
                                    <div className="posts__date">{date}</div>
                                </div>
                            </div>
                            <div className="container__post-menu">
                                <ul className="post-menu__list">
                                    <li className='post-menu__item' onClick={handleLike}><AiOutlineHeart />{postData.likes.length}</li>
                                </ul>
                                <div className="post-menu__text">
                                    {postData.descPost}
                                </div>
                            </div>
                        </div>
                        <div className='post-container__coments'>
                            {comments?.map((el) => (
                                <PostComment key={el._id} comment={el} />
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="container-form__comment">
                                <img src={postData.userImg} alt="user-img" />
                                <input value={commentData.comment} onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })} placeholder='Написать комментарий...' type="text" />
                            </div>
                        </form>
                    </aside>
                </div>
            )
                : (
                    <div className='post-container' style={{ display: 'block' }} onClick={(e) => e.stopPropagation()}>
                        <div className='container-cross' onClick={() => setOpenPostWindow(false)}>
                            <MdClose className="cross" />
                        </div>
                        <div className="post-container__inner">
                            <div className="post__header">
                                <div className='post__img-author'>
                                    <img src={postData.userImg} alt="user-img" />
                                </div>
                                <div className="post-item__meta">
                                    <div className='post__author'>{postData.firstName} {postData.lastName}</div>
                                    <div className="posts__date">{date}</div>
                                </div>
                            </div>
                            <div className="container__post-menu">
                                <ul className="post-menu__list">
                                    <li className='post-menu__item' onClick={handleLike}><AiOutlineHeart />{postData.likes.length}</li>
                                </ul>
                                <div className="post-menu__text">
                                    {postData.descPost}
                                </div>
                            </div>
                        </div>
                        <div className='post-container__coments' style={{ minHeight: '400px', maxHeight: '400px' }}>
                            {comments?.map((el) => (
                                <PostComment key={el._id} comment={el} />
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="container-form__comment">
                                <img src={postData.userImg} alt="user-img" />
                                <input value={commentData.comment} onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })} placeholder='Написать комментарий...' type="text" />
                            </div>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default PostWIndow