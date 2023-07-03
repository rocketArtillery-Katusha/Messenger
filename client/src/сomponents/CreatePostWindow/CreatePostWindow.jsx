import React from 'react';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/features/postSlice';
import MessageError from '../MessageError/MessageError';
import './create-post.css';

const CreatePostWindow = ({ setOpenCreatePostWindow }) => {
    const [postData, setPostData] = useState({ descPost: '', imgPost: '' });
    const [correctPostData, setCorrectPostData] = useState(true);
    const messageError = "Пост не может быть полностью пустым";
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postData.descPost || postData.imgPost) {
            const data = new FormData();
            data.append('descPost', postData.descPost);
            data.append('imgPost', postData.imgPost);
            dispatch(createPost(data));
            setOpenCreatePostWindow(false);
        } else {
            setCorrectPostData(false);
        }
    };

    return (
        <div className='create-post-form__blur' onClick={() => setOpenCreatePostWindow(false)}>
            <div className='create-post__form'>
                <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="create-post__content">
                        <div className='container-cross' onClick={() => setOpenCreatePostWindow(false)}>
                            <MdClose className="cross" />
                        </div>
                        <div className="post__row">
                            <div className="post__caption">
                                Описание поста
                            </div>
                            <textarea value={postData.descPost} onChange={(e) => setPostData({ ...postData, descPost: e.target.value })} placeholder='Введите описание поста' type="text" name="desc-post" />
                        </div>
                        <div className="post__row">
                            <div className="post__caption">
                                Добавьте картинку
                            </div>
                            {postData.imgPost ? (
                                <div className="create-container-post__img">
                                    <img src={URL.createObjectURL(postData.imgPost)} alt={postData.imgPost.name} />
                                    <div className="hover-overlay-post__img">
                                        <div className='container-cross__img'>
                                            <MdClose className="cross__img" onClick={() => setPostData({ ...postData, imgPost: '' })} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="create-container-post__img">
                                    <input onChange={(e) => setPostData({ ...postData, imgPost: e.target.files[0] })} type="file" name="img-post" />
                                    <div className="create-circle-add__img">+</div>
                                </div>
                            )}
                        </div>
                        {!correctPostData && (
                            <div className='post__row'>
                                <MessageError messageError={messageError} />
                            </div>
                        )}
                        <div className='post__row'>
                            <div className="post__row-container-btn">
                                <button type='submit' className='btn-create-post'>Создать пост</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CreatePostWindow