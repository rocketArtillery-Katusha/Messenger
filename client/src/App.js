import Header from "./сomponents/Header/Header";
import PostsPage from "./pages/PostsPage/PostsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ConversationsPage from "./pages/ConversationsPage/ConversationsPage";
import ConversationPage from "./pages/ConversationPage/ConversationPage";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useLoadingWithAccessToken } from "./hooks/useLoadingWithAccessTokne";
import { useEffect } from "react";
import { setAuth } from "./redux/auth-slice";
import { getMessagesOrMessage } from "./redux/message-slice";
import socketInit from "./socket/socket";
import actions from "./socket/actions";
import "./App.css";

function App() {
    const { loading } = useLoadingWithAccessToken();
    const { isAuth } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading && user) {
            const socket = socketInit();
            socket.emit(actions.ADD_USER, user.id);
            socket.on(actions.GET_REQUEST, (data) => {
                dispatch(setAuth(data));
            });
            socket.on(actions.GET_MY_FRIEND, (data) => {
                dispatch(setAuth(data));
            });
            socket.on(actions.GET_MESSAGE, (data) => {
                dispatch(getMessagesOrMessage(data));
            });
        }
    }, [loading, user, dispatch]);

    return (
        <div className="wrapper">
            {loading ? (
                <div>Загрузка</div>
            ) : (
                <div className="wrapper-container">
                    {isAuth && (
                        <header className="header">
                            <Header />
                        </header>
                    )}
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <GuestRoute>
                                        <AuthPage />
                                    </GuestRoute>
                                }
                            />
                            <Route path="conversations/:id" element={<ConversationPage />} />
                            <Route path="conversations" element={<ConversationsPage />} />
                            <Route path="main" element={<PostsPage />} />
                            <Route path="friends" element={<FriendsPage />} />
                            {["profile", "profile/:id"].map((path, index) => (
                                <Route path={path} element={<ProfilePage />} key={index} />
                            ))}
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
}

const GuestRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.auth);
    const location = useLocation();
    if (isAuth) {
        return <Navigate to="main" state={{ from: location }} />;
    }
    return children;
};

export default App;
