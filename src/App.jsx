import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { setLoginModalActionCreator } from './states/showLoginModal/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginModal from './components/LoginModal';
import TopUserPage from './pages/TopUsersPage';
import ProfilePage from './pages/ProfilePage';
import Error404 from './pages/Error404';
import Loading from './components/Loading';

function App() {
  const {
    authUser = null,
    isPreload = false,
    showLoginModal = false,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const closeLoginModalHandler = () => {
    dispatch(setLoginModalActionCreator(false));
  };

  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <div className="App">
          <header>
            <Navbar authUser={authUser} />
          </header>
          <LoginModal
            showLoginModal={showLoginModal}
            closeLoginModal={closeLoginModalHandler}
          />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/*" element={<Error404 />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/threads/:threadId" element={<DetailPage />} />
              <Route path="/topusers" element={<TopUserPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="App">
        <header>
          <Navbar authUser={authUser} onLogout={onLogoutHandler} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Error404 />} />
            <Route path="/threads/:threadId" element={<DetailPage />} />
            <Route path="/topusers" element={<TopUserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
