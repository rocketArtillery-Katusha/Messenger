import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createPost } from "../../http/features/post-features";
import { getPostsOrPost } from "../../redux/post-slice";
import MessageError from "../../UI/CaptionError/CaptionError";
import "./create-post.css";

const CreatePostWindow = ({ toggleModalWindow }) => {
    const [postData, setPostData] = useState({ descPost: "", postImg: "" });
    const [correctPostData, setCorrectPostData] = useState(true);
    const messageError = "Пост не может быть полностью пустым";
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (postData.descPost || postData.postImg) {
                const formData = new FormData();
                formData.append("descPost", postData.descPost);
                formData.append("postImg", postData.postImg);

                const { data } = await createPost(formData);

                dispatch(getPostsOrPost(data));

                toggleModalWindow();
            } else {
                setCorrectPostData(false);
            }
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div className="create-post-form__blur" onClick={toggleModalWindow}>
            <div className="create-post__form">
                <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="create-post__content">
                        <div className="container-cross" onClick={toggleModalWindow}>
                            <MdClose className="cross" />
                        </div>
                        <div className="post__row">
                            <div className="post__caption">Описание поста</div>
                            <textarea
                                value={postData.descPost}
                                onChange={(e) => setPostData({ ...postData, descPost: e.target.value })}
                                placeholder="Введите описание поста"
                                type="text"
                                name="desc-post"
                            />
                        </div>
                        <div className="post__row">
                            <div className="post__caption">Добавьте картинку</div>
                            {postData.postImg ? (
                                <div className="create-container-post__img">
                                    <img src={URL.createObjectURL(postData.postImg)} alt={postData.postImg.name} />
                                    <div className="hover-overlay-post__img">
                                        <div className="container-cross__img">
                                            <MdClose
                                                className="cross__img"
                                                onClick={() => setPostData({ ...postData, postImg: "" })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="create-container-post__img">
                                    <input
                                        onChange={(e) => setPostData({ ...postData, postImg: e.target.files[0] })}
                                        type="file"
                                        name="img-post"
                                    />
                                    <div className="create-circle-add__img">+</div>
                                </div>
                            )}
                        </div>
                        {!correctPostData && (
                            <div className="post__row">
                                <MessageError messageError={messageError} />
                            </div>
                        )}
                        <div className="post__row">
                            <div className="post__row-container-btn">
                                <button type="submit" className="btn-create-post">
                                    Создать пост
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostWindow;
