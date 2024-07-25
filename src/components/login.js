import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../context/LoginContext'; // 로그인 컨텍스트 훅 가져오기

function Login() {
  const [credentials, setCredentials] = useState({
    user_id: "",
    password: "",
  });

  const [error, setError] = useState(""); // 에러 메시지를 위한 상태
  const navigate = useNavigate();
  const { login } = useLogin(); // 로그인 컨텍스트 훅 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    fetch("http://localhost:3011/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess && data.token) {
          // 로그인 성공 시
          login(data.user, data.token); // 로그인 컨텍스트 업데이트
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/calendar"); // 로그인 후 캘린더 페이지로 이동
        } else {
          setError(data.message || "로그인 실패"); // 에러 메시지 업데이트
        }
      })
      .catch((error) => {
        console.error("로그인 오류:", error);
        setError("로그인 중 오류가 발생했습니다."); // 에러 메시지 업데이트
      });
  };

  return (
    <div className="page">
      <div className="title">LOGIN</div>
      <form className="content" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="user_id"
          placeholder="ID"
          value={credentials.user_id}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button
          className={`login-button ${credentials.user_id && credentials.password ? 'enabled' : ''}`}
          disabled={!credentials.user_id || !credentials.password}
          type="submit"
        >
          로그인
        </button>
      </form>
      {error && <div className="error-message">{error}</div>} {/* 에러 메시지 표시 */}
      <div className="actions">
        <Link to="/signup" className="signup-link">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
