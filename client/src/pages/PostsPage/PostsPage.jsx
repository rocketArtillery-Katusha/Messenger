import React from 'react';
import Post from '../../сomponents/Post/Post';
import CreatePostWindow from '../../сomponents/CreatePostWindow/CreatePostWindow';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../redux/features/postSlice';
import './posts-page.css';

const PostsPage = () => {
    const [openCreatePostWindow, setOpenCreatePostWindow] = useState(false);
    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.post.posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <div className='container__column-posts'>
            {openCreatePostWindow ? (<CreatePostWindow setOpenCreatePostWindow={setOpenCreatePostWindow} />) : ''}
            <div className="container__btn-create-post">
                <button onClick={() => setOpenCreatePostWindow(true)} className='btn-create-post'>Создать пост</button>
            </div>
            <ul className='post-container__list'>
                {postsData?.map((el) => (
                    <Post key={el._id} postData={el} />
                ))}
            </ul>
        </div>
    )
}

export default PostsPage