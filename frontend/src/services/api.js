import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3330',
});

export default api;
