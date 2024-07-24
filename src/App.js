import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduce from './components/introduce';
import Login from './components/login';
import Signup from './components/signup';
import MyPage from './components/mypage';
import Navbar from './components/navbar';
import { LoginProvider } from './context/LoginContext';

const App = () => {
  return (
    <LoginProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
};

export default App;
