import React from "react";
import "./post-comment.css";

const PostComment = ({ comment }) => {
    return (
        <div className="container__comment">
            <div className="comment__header">
                <div className="comment__img-author">
                    <img src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${comment.userImg}`} alt={comment.userImg} />
                </div>
                <div className="comment__meta">
                    <div className="comment__author">
                        {comment.firstName} {comment.lastName}
                    </div>
                    <div className="comment__data">{comment.createdAt}</div>
                </div>
            </div>
            <div className="comment__main-text">{comment.comment}</div>
        </div>
    );
};

export default PostComment;
