import React, { useCallback, useEffect } from "react";
import { getUserById } from "../../http/features/user-features";
import { getUsersOrUser } from "../../redux/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ConversationUser = ({ conversation, user }) => {
    const dispatch = useDispatch();
    const { otherUser } = useSelector((state) => state.user);

    const getUser = useCallback(async () => {
        const userId = conversation.members.find((memberId) => memberId !== user.id);
        try {
            const { data } = await getUserById(userId);

            dispatch(getUsersOrUser(data));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, user, conversation]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <li key={conversation.id} className="container__user">
            <Link to={`${conversation.id}`}>
                <div className="user-data">
                    <img
                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${otherUser?.userInfo.userImg}`}
                        alt={otherUser?.userInfo.userImg}
                    />
                    <div className="user-name">
                        {otherUser?.firstName} {otherUser?.lastName}
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default ConversationUser;
