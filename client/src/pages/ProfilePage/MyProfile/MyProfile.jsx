import React, { useCallback, useEffect, useState } from "react";
import UserInfo from "../../../сomponents/UserInfo/UserInfo";
import ChangeUserInfo from "../../../сomponents/ChangeUserInfo/ChangeUserInfo";
import Post from "../../../сomponents/Post/Post";
import { logout } from "../../../redux/auth-slice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyPosts } from "../../../http/features/post-features";
import { getPostsOrPost } from "../../../redux/post-slice";

const MyProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.post);
    const [changeUserInfo, setChangeUserInfo] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleChangeUserInfo = () => {
        setChangeUserInfo((state) => !state);
    };

    const hendleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    const getPosts = useCallback(async () => {
        try {
            const { data } = await getMyPosts();

            dispatch(getPostsOrPost(data));
        } catch (err) {
            console.log(err.response.data);
        }
    }, [dispatch]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <>
            <form className="profile" onSubmit={(e) => e.preventDefault()}>
                {changeUserInfo ? (
                    <ChangeUserInfo user={user} toggleChangeUserInfo={toggleChangeUserInfo} />
                ) : (
                    <UserInfo user={user} logout={hendleLogout} toggleChangeUserInfo={toggleChangeUserInfo} />
                )}
            </form>
            <ul className="post-container__list">
                {posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </ul>
        </>
    );
};

export default MyProfile;
