import axios from 'axios';

const api = axios.create({ baseURL: 'https://localhost:44308/api' });

export default api;