import { toast } from 'sonner';
import axiosInstance from '../axios';
import { User } from '@/types/user';

export const registerUser = async (user: User) => {
  try {
    const response = await axiosInstance.post('/auth/register', user);
    toast.success("Bạn đã đăng kí thành công.");
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 409) {
      toast.error("Email đã được sử dụng.");
    }
    console.error('Error email exist:', error);
    throw error;
  }
};

export const loginUser = async (user: User) => {
  const response = await axiosInstance.post('/auth/login', user);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};