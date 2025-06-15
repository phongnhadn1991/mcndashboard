import { toast } from 'sonner';
import axiosInstance from '../axios';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const registerUser = async (user: User) => {
  try {
    const response = await axiosInstance.post('ngoanmc/v1/auth/register', user);
    toast.success(response.data.message);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 409) {
      toast.error(error.response.data.message);
    }
    throw error;
  }
};

export const loginUser = async (user: User) => {
  try {
    const response = await axiosInstance.post('jwt-auth/v1/token', user);
    console.log('Login response:', response.data);
    const { token } = response.data.data;
    // Số → tính theo ngày (ví dụ 1 = 1 ngày).
    // Lưu token vào cookie
    Cookies.set('token', token, { 
      expires: 1,
      path: '/',
      sameSite: 'lax'
    });
    
    // Cập nhật header Authorization cho axios instance
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    toast.success('Đăng nhập thành công');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(error.response.data.message);
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // Gọi API logout
    await axiosInstance.post('jwt-auth/v1/logout');
    
    // Xóa token
    removeToken();
    
    // Clear tất cả cookies liên quan đến auth
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
    
    return { success: true };
  } catch (error) {
    // Ngay cả khi API call thất bại, vẫn xóa token
    removeToken();
    throw error;
  }
};

export const removeToken = () => {
  // Xóa token với tất cả các options có thể
  Cookies.remove('token', { 
    path: '/',
    domain: window.location.hostname,
    sameSite: 'lax'
  });
  
  // Xóa token với domain mặc định
  Cookies.remove('token');
  
  // Xóa token với domain root
  Cookies.remove('token', { domain: '.' + window.location.hostname });
  
  // Xóa header Authorization
  delete axiosInstance.defaults.headers.common['Authorization'];
  
  // Clear localStorage nếu có
  localStorage.removeItem('token');
  
  // Clear sessionStorage nếu có
  sessionStorage.removeItem('token');
}

export const refreshToken = async () => {
  try {
    // Bước 1: Refresh refresh_token (cookie)
    await axiosInstance.post('jwt-auth/v1/token/refresh');
    // Bước 2: Lấy access token mới bằng refresh_token (cookie)
    const response = await axiosInstance.post('jwt-auth/v1/token');
    const { token } = response.data.data;
    // Lưu lại token mới vào cookie (nếu cần)
    // Số → tính theo ngày (ví dụ 1 = 1 ngày).
    Cookies.set('token', token, {
      expires: 1,
      path: '/',
      sameSite: 'lax'
    });
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (error) {
    removeToken();
    throw error;
  }
};