import Header from './сomponents/Header/Header';
import PostsPage from './pages/PostsPage/PostsPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/features/authSlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  return (
    <div className='wrapper'>
      {isAuth === null ? '' : typeof isAuth === 'object' ? (
        <div className='wrapper-container'>
          <header className='header'>
            <Header />
          </header>
          <div className='container'>
            <Routes>
              <Route path='/' element={<PostsPage />} />
              <Route path='/profile' element={<ProfilePage />} />
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
  );
};

export default App;
