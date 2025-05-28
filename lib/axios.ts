import axios from 'axios';

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
    // Bạn có thể thêm token vào đây nếu cần
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      // Không nhận được response
      console.error('Request Error:', error.request);
    } else {
      // Lỗi khi setting up request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 