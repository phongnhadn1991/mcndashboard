import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ Cookies
    const token = Cookies.get('token');
    if (token) {
      // Đảm bảo header Authorization được set đúng format
      config.headers.Authorization = `Bearer ${token}`;
      // Log để debug
      console.log('Request headers:', config.headers);
    } else {
      // Nếu không có token, xóa header Authorization
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi ở đây
    if (error.response) {
      // Lỗi từ server
      console.log('Response Error:', error.response.data);
      // Nếu là lỗi 401, xóa token
      if (error.response.status === 401) {
        Cookies.remove('token', { path: '/' });
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    } else if (error.request) {
      // Không nhận được response
      console.log('Request Error:', error.request);
    } else {
      // Lỗi khi setting up request
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 