// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que este sea el URL correcto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
