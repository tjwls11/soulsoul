import React, { createContext, useContext, useState } from 'react';

// 로그인 컨텍스트 생성
const LoginContext = createContext();

// 로그인 컨텍스트를 제공하는 컴포넌트
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 함수
  const login = (userInfo) => {
    setUser(userInfo);
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// useLogin 훅을 통해 로그인 정보를 가져오기
export const useLogin = () => {
  return useContext(LoginContext);
};
