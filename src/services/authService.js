import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const register = async (user: { email: string, password: string, role: string }) => {
  return axios.post(`${API_URL}/register`, user);
};

const login = async (user: { email: string, password: string }) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
