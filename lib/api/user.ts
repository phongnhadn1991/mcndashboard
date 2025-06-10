// import { toast } from 'sonner';
import { User } from '@/types/user';
import axiosInstance from '../axios';


export const getUserMe = async () => {
    try {
      const response = await axiosInstance.get('wp/v2/users/me');
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
};

export const updateUserMeByID = async (user:User) : Promise<User> => {
    try {
        const response = await axiosInstance.post(`wp/v2/users/${user.id}`, user);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
}