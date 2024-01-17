import React, { useCallback } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getAllCommets } from "../../http/features/comment-features";
import { getCommentsOrComment } from "../../redux/comment-slice";
import PostComment from "../PostComment/PostComment";
import "./post-window.css";

const PostWIndow = ({ toggleModalWindow, handleLike, post }) => {
    const [commentData, setCommentData] = useState({ comment: "" });
    const { comments } = useSelector((state) => state.comment);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createComment(commentData, post.id);

            dispatch(getCommentsOrComment(data));

            setCommentData({ comment: "" });
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = useCallback(async () => {
        try {
            const { data } = await getAllCommets(post.id);

            dispatch(getCommentsOrComment(data));
        } catch (err) {
            console.log(err.data.response);
        }
    }, [dispatch, post]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    return (
        <div className="post__blur" onClick={toggleModalWindow}>
            {post.postImg ? (
                <div className="post-container" onClick={(e) => e.stopPropagation()}>
                    <div className="container-cross" onClick={toggleModalWindow}>
                        <MdClose className="cross" />
                    </div>
                    <div className="post-container__img">
                        <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.postImg}`} alt={post.postImg} />
                    </div>
                    <aside className="post__sidebar">
                        <div className="post-container__inner">
                            <div className="post__header">
                                <div className="post__img-author">
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.userImg}`}
                                        alt={post.userImg}
                                    />
                                </div>
                                <div className="post-item__meta">
                                    <div className="post__author">
                                        {post.firstName} {post.lastName}
                                    </div>
                                    <div className="posts__date">{""}</div>
                                </div>
                            </div>
                            <div className="container__post-menu">
                                <ul className="post-menu__list">
                                    <li className="post-menu__item" onClick={handleLike}>
                                        <AiOutlineHeart />
                                        {post.likes.length}
                                    </li>
                                </ul>
                                <div className="post-menu__text">{post.descPost}</div>
                            </div>
                        </div>
                        <ul className="post-container__coments">
                            {comments?.map((comment) => (
                                <li key={comment.id}>
                                    <PostComment comment={comment} />
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={handleSubmit}>
                            <div className="container-form__comment">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.userImg}`}
                                    alt={post.userImg}
                                />
                                <input
                                    value={commentData.comment}
                                    onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                                    placeholder="Написать комментарий..."
                                    type="text"
                                />
                            </div>
                        </form>
                    </aside>
                </div>
            ) : (
                <div className="post-container" style={{ display: "block" }} onClick={(e) => e.stopPropagation()}>
                    <div className="container-cross" onClick={toggleModalWindow}>
                        <MdClose className="cross" />
                    </div>
                    <div className="post-container__inner">
                        <div className="post__header">
                            <div className="post__img-author">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.userImg}`}
                                    alt={post.userImg}
                                />
                            </div>
                            <div className="post-item__meta">
                                <div className="post__author">
                                    {post.firstName} {post.lastName}
                                </div>
                                <div className="posts__date">{""}</div>
                            </div>
                        </div>
                        <div className="container__post-menu">
                            <ul className="post-menu__list">
                                <li className="post-menu__item" onClick={handleLike}>
                                    <AiOutlineHeart />
                                    {post.likes.length}
                                </li>
                            </ul>
                            <div className="post-menu__text">{post.descPost}</div>
                        </div>
                    </div>
                    <div className="post-container__coments" style={{ minHeight: "400px", maxHeight: "400px" }}>
                        {comments?.map((el) => (
                            <PostComment key={el._id} comment={el} />
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="container-form__comment">
                            <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.userImg}`} alt={post.userImg} />
                            <input
                                value={commentData.comment}
                                onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                                placeholder="Написать комментарий..."
                                type="text"
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostWIndow;
