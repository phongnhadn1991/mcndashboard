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
    const { token } = response.data.data;

    // Lưu token vào cookie với domain và path phù hợp
    Cookies.set('token', token, { 
      expires: 7,
      path: '/',
      sameSite: 'strict'
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

export const logoutUser = () => {
    Cookies.remove('token', { path: '/' });
    // Xóa header Authorization
    delete axiosInstance.defaults.headers.common['Authorization'];
    toast.success('Đăng xuất thành công');
    return { success: true };
};

export const getUserMe = async () => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Không tìm thấy token');
    }
    
    // Đảm bảo header Authorization được set
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axiosInstance.get('wp/v2/users/me');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        // Nếu token hết hạn, xóa token và header
        Cookies.remove('token', { path: '/' });
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    }
    throw error;
  }
};