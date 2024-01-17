import React, { useCallback, useEffect, useState } from "react";
import "./conversation-page.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesOrMessage } from "../../redux/message-slice";
import { getMessages, createMessage } from "../../http/features/message-features";
import socketInit from "../../socket/socket";
import actions from "../../socket/actions";

const ConversationPage = () => {
    const { user } = useSelector((state) => state.auth);
    const { messages } = useSelector((state) => state.message);
    const socket = socketInit();
    const params = useParams();
    const dispatch = useDispatch();

    const [messageData, setMessageData] = useState({
        conversationId: params.id,
        senderId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        userImg: user.userInfo.userImg,
        text: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (messageData.text) {
            try {
                const { data } = await createMessage(messageData);

                dispatch(getMessagesOrMessage(data));
                socket.emit(actions.SEND_MESSAGE, data);
                setMessageData({ ...messageData, text: "" });
            } catch (error) {
                console.log(error);
            }
        }
        return;
    };

    const submitGetMessages = useCallback(async () => {
        try {
            const { data } = await getMessages(params.id);

            dispatch(getMessagesOrMessage(data));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, params]);

    useEffect(() => {
        submitGetMessages();
    }, [submitGetMessages]);

    return (
        <form onSubmit={handleSubmit} className="chat-container">
            <div className="chat">
                {messages?.map((message) => (
                    <div
                        key={message.id}
                        className={
                            message?.senderId === user?.id ? "message__container myMessage" : "message__container"
                        }
                    >
                        {message?.senderId === user?.id ? (
                            <div className="message-container__inner">
                                <div className="message">{message.text}</div>
                                <img
                                    style={{ marginRight: 0, marginLeft: 10 }}
                                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${message.userImg}`}
                                    alt={message.userImg}
                                />
                            </div>
                        ) : (
                            <div className="message-container__inner">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/${message.userImg}`}
                                    alt={message.userImg}
                                />
                                <div className="message">{message.text}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="send"
                value={messageData.text}
                onChange={(e) => setMessageData({ ...messageData, text: e.target.value })}
            />
        </form>
    );
};

export default ConversationPage;
