import React, { useCallback } from "react";
import Post from "../../сomponents/Post/Post";
import CreatePostWindow from "../../сomponents/CreatePostWindow/CreatePostWindow";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../http/features/post-features";
import { getPostsOrPost } from "../../redux/post-slice";

import "./posts-page.css";

const PostsPage = () => {
    const [openCreatePostWindow, setOpenCreatePostWindow] = useState(false);
    const { posts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const getPosts = useCallback(async () => {
        try {
            const { data } = await getAllPosts();

            dispatch(getPostsOrPost(data));
        } catch (err) {
            console.log(err.response.data);
        }
    }, [dispatch]);

    const toggleModalWindow = () => {
        setOpenCreatePostWindow((state) => !state);
    };

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div className="container__column-posts">
            {openCreatePostWindow && <CreatePostWindow toggleModalWindow={toggleModalWindow} />}
            <div className="container__btn-create-post">
                <button className="btn-create-post" onClick={toggleModalWindow}>
                    Создать пост
                </button>
            </div>
            <ul className="post-container__list">
                {posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;
