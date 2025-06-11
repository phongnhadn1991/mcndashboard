// import { toast } from 'sonner';
import { PasswordData, User } from '@/types/user';
import axiosInstance from '../axios';

export const api_getUserMe = async () => {
    try {
      const response = await axiosInstance.get('wp/v2/users/me');
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
};

export const api_updateUserMeByID = async (user:User) : Promise<User> => {
    try {
        const response = await axiosInstance.post(`wp/v2/users/${user.id}`, user);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}

export const api_deleteAvatarUser = async (userId: number) => {
  try {
      const response = await axiosInstance.post('ngoanmc/v1/users/delete_avatar', {user_id : userId});
      return response.data;
  } catch (error: unknown) {
      throw error;
  }
}

export const api_changePasswordUser = async (dataPasswordUser: PasswordData) => {
  try {
      const response = await axiosInstance.post('ngoanmc/v1/users/change_password', dataPasswordUser);
      return response.data;
  } catch (error: unknown) {
      throw error;
  }
}