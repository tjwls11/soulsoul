import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Navbar = () => {
  const { user, logout } = useLogin(); // 로그인 상태와 로그아웃 함수 가져오기

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {user ? ( // 로그인된 경우
          <>
            <Link to="/diary">Diary</Link>
            <Link to="/calendar">Mood Tracker</Link>
            <Link to="/mypage">My Page</Link>
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        ) : (
          // 로그인되지 않은 경우
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
