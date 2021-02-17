import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import MainPage from './pages/MainPage';
import TodayTr from './pages/TodayTr';
import './App.css';
import MyPage from './pages/MyPage';
import Modify from './pages/Modify';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>HomeTraining</title>
      </Helmet>
      <Route component={HomePage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={PostListPage} path="/postlist"/>
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={MainPage} path="/main" />
      <Route component={TodayTr} path="/todaytr" />
      <Route component={MyPage} path="/mypage" />
      <Route component={Modify} path="/modify/:id" />
    </>
  );
}

export default App;
