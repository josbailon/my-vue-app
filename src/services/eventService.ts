import axios from 'axios';

const API_URL = 'http://localhost:3000/api/events';

const createEvent = async (formData: FormData) => {
  return axios.post(`${API_URL}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getAllEvents = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export default {
  createEvent,
  getAllEvents,
};
