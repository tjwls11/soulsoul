import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3011';

// 사용자 정보 가져오기
export const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user-info`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 비밀번호 변경
export const changePassword = async (currentPassword, newPassword, token) => {
  try {
    await axios.post(`${API_URL}/change-password`, {
      currentPassword,
      newPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// 무드 데이터 가져오기
export const fetchMoodData = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/api/notes`, {
      params: { date },
    });

    if (response.data.one === 'No summary available') {
      return 'No summary available';
    }

    return response.data.one;
  } catch (error) {
    console.error('Error fetching mood data:', error);
    throw error;
  }
};
