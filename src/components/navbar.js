import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Navbar = () => {
  const { user, logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 소개 페이지로 리디렉션
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/diary">Diary</Link>
            <Link to="/calendar">Mood Tracker</Link>
            <Link to="/mypage">My Page</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
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
