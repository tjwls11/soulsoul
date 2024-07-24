import React, { useState, useEffect } from "react";
import "../style/mypage.css";
import { Link } from "react-router-dom";

export const Mypage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming you have an API endpoint to get user info
        const response = await fetch('http://localhost:3011/user-info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mypage">
      <section className="sec">
        <div className="sec-box">
          <h1 className="sec-main">My Page</h1>
          <div className="sec-img">
            <img
              src={process.env.PUBLIC_URL + "./img/mypage.png"}
              alt="mypage"
            />
            {/* public 파일에 img폴더에 있는 사진 삽입*/}
          </div>
          <table>
            <tbody>
              <tr>
                <th className="name">이름</th>
                <td>{user?.name || '정보 없음'}</td>
              </tr>
              <tr>
                <th className="name">아이디</th>
                <td>{user?.user_id || '정보 없음'}</td>
              </tr>
              
              <tr>
                <th className="name">내 코인</th>
                <td>{user?.coin || '정보 없음'}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="sec-wrap">
            <Link to="modify" style={{ textDecoration: "none" }}>
       
              수정
            </Link>
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Mypage;
