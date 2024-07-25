import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3011/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, password })
      });

      const result = await response.json();

      if (result.isSuccess) {
        // 로그인 성공 시 localStorage에 저장
        localStorage.setItem('user_id', result.user.user_id);
        localStorage.setItem('token', result.token);

        alert('로그인 성공');
        navigate('/diary'); // 로그인 후 일기 페이지로 이동
      } else {
        alert('로그인 실패: ' + result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">사용자 ID</label>
          <input
            type="text"
            className="form-control"
            id="user_id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">로그인</button>
      </form>
    </div>
  );
};

export default Login;
