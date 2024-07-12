import axios from 'axios';

const API_URL = 'http://localhost:3000/api/documents';

const uploadDocument = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getAllDocuments = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data as Document[];
};

export default {
  uploadDocument,
  getAllDocuments,
};

interface Document {
  id: number;
  title: string;
  description: string;
  document: string;
}
