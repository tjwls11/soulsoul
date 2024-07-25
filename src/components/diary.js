import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const user_id = 'YOUR_USER_ID'; // 사용자 ID를 실제 ID로 대체해야 합니다.

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰 가져오기
    try {
      const response = await fetch(`http://localhost:3011/get-diaries?user_id=${user_id}`, { // 실제 사용자 ID로 대체
        headers: {
          'Authorization': `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 포함
        }
      });
      const data = await response.json();
      setDiaries(data.diaries || []);
    } catch (error) {
      console.error('Error fetching diaries:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰 가져오기
    try {
      await fetch(`http://localhost:3011/delete-diary/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` } // JWT 토큰을 Authorization 헤더에 포함
      });
      setDiaries(diaries.filter((diary) => diary.id !== id));
    } catch (error) {
      console.error('Error deleting diary:', error);
    }
  };

  return (
    <div>
      <br />
      <div className="container mt-5 text-center">
        <h1 className="display-4 mt-4 fw-bold">
          <i className="bi bi-book"></i>
          오늘의<span className="spantag"> 일기</span>
        </h1>
        <br />
        <br />
        <div className="d-grid gap-2">
          <Link
            to="/add-diary"
            className="text-white fw-bold text-decoration-none btn mb-2"
          >
            글쓰기
          </Link>
        </div>
        <table className="table table-striped mt-4 mb-5">
          <thead className="custom-thead">
            <tr>
              <th className="text-center">제목</th>
              <th className="text-center">날짜</th>
              <th className="text-center">내용</th>
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {diaries.map((diary) => (
              <tr key={diary.id}>
                <td className="text-center">{diary.title}</td>
                <td className="text-center">{diary.date}</td>
                <td className="text-center">{diary.content}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(diary.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Diary;
