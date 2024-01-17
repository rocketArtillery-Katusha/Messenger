import React, { useState } from "react";
import PostWIndow from "../PostWindow/PostWIndow";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleLikePost } from "../../http/features/post-features";
import { likePost } from "../../redux/post-slice";
import "./post.css";

const Post = ({ post }) => {
    const [openPostWindow, setOpenPostWindow] = useState(false);
    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            const { data } = await toggleLikePost(post.id);

            dispatch(likePost(data));
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const toggleModalWindow = () => {
        setOpenPostWindow((state) => !state);
    };

    return (
        <li className="post-container__item">
            {openPostWindow && <PostWIndow toggleModalWindow={toggleModalWindow} post={post} handleLike={handleLike} />}
            <div className="post-item__header">
                <div className="post-item__img-author">
                    <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post?.userImg}`} alt={post?.userImg} />
                </div>
                <div className="post-item__meta">
                    <div className="post-item__author">
                        {post.firstName} {post.lastName}
                    </div>
                    <div className="post-item__date">{post.cratedAt}</div>
                </div>
            </div>
            <div className="post-item__main">
                {post.descPost && <div className="post-item__desc">{post.descPost}</div>}
                {post.postImg && (
                    <img
                        className="post-item__img"
                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${post.postImg}`}
                        alt={post.postImg}
                    />
                )}
            </div>
            <ul className="post-item-menu__list">
                <li className="post-item-menu__item" onClick={handleLike}>
                    <AiOutlineHeart />
                    {post.likes.length}
                </li>
                <li className="post-item-menu__item" onClick={toggleModalWindow}>
                    <FaRegComment />
                    {post.comments.length}
                </li>
            </ul>
        </li>
    );
};

export default Post;
