import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
});

axiosClient.interceptors.response.use(
  (response : any) => response,
  (error : any) => {
    const message =
      error.response?.data?.message || 'Error de conexión con el servidor';
    console.error(message);
    return Promise.reject(message);
  }
);

export default axiosClient;
