import Header from './сomponents/Header/Header';
import PostsPage from './pages/PostsPage/PostsPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import ConversationPage from './pages/ConversationPage/ConversationPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, socketUpdateMe } from './redux/features/authSlice';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { socketContext } from './utils/socketContext';
import io from 'socket.io-client';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.me);
  const socket = useRef();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      socket.current = io("ws://localhost:8900");
      socket.current.emit("addUser", isAuth._id);
      socket.current.on("deletedFriend", ({ updatedUser, deletedFriend }) => {
        dispatch(socketUpdateMe({ updatedUser, deletedFriend }));
      });
      socket.current.on("requestsFriends", ({ updatedUser, newRequest }) => {
        dispatch(socketUpdateMe({ updatedUser, newRequest }));
      });
      socket.current.on("cancledRequest", ({ updatedUser, deletedRequest }) => {
        dispatch(socketUpdateMe({ updatedUser, deletedRequest }));
      });
      socket.current.on("addedFriend", ({ updatedUser, addedFriend }) => {
        dispatch(socketUpdateMe({ updatedUser, addedFriend }));
      });
      socket.current.on("getMessage", (data) => {
        // dispatch(updateMessageState(data))
      });
    }
  }, [dispatch, isAuth]);

  return (
    <socketContext.Provider value={socket}>
      <div className='wrapper'>
        {isAuth === null ? '' : typeof isAuth === 'object' ? (
          <div className='wrapper-container'>
            <header className='header'>
              <Header />
            </header>
            <div className='container'>
              <Routes>
                <Route path='/' element={<PostsPage />} />
                <Route path='friends' element={<FriendsPage />} />
                {['profile', 'profile/:id'].map((path, index) => <Route path={path} element={<ProfilePage />} key={index} />)}
                <Route path='messages' element={<MessagesPage />} />
                <Route path='messages/:id' element={<ConversationPage />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className='wrapper-container'>
            <div className='container'>
              <AuthPage />
            </div>
          </div>
        )}
      </div>
    </socketContext.Provider>
  );
};

export default App;
