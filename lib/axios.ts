import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from './api/authent';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
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
  async (error) => {
    const originalRequest = error.config;

    // Nếu là lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const newToken = await refreshToken();
        
        // Cập nhật header Authorization với token mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Thử lại request ban đầu
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, xóa token và chuyển về trang login
        Cookies.remove('token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
        delete axiosInstance.defaults.headers.common['Authorization'];

        // Chuyển hướng về trang login nếu đang ở client side
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 