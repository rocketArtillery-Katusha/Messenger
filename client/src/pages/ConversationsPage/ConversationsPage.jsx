import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../http/features/conversation-features";
import { getConversationsOrConversation } from "../../redux/conversation-slice";
import ConversationUser from "../../сomponents/ConversationUser/ConversationUser";
import "./conversations-page.css";

const ConversationsPage = () => {
    const dispatch = useDispatch();
    const { conversations } = useSelector((state) => state.conversation);
    const { user } = useSelector((state) => state.auth);

    const submitGetConversations = useCallback(async () => {
        try {
            const { data } = await getConversations();

            dispatch(getConversationsOrConversation(data));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        submitGetConversations();
    }, [submitGetConversations]);

    return (
        <div className="container-conversations">
            <div className="conversations">
                <ul>
                    {conversations &&
                        user &&
                        conversations.map((conversation) => (
                            <ConversationUser conversation={conversation} user={user} />
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default ConversationsPage;
