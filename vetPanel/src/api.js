import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // common backend base
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
