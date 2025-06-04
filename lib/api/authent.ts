import { toast } from 'sonner';
import axiosInstance from '../axios';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

export const registerUser = async (user: User) => {
  try {
    const response = await axiosInstance.post('/auth/register', user);
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
    const response = await axiosInstance.post('/auth/login', user);
    toast.success(response.data.message);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error(error.response.data.message);
    }
    throw error;
  }
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};