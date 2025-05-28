import axiosInstance from '../axios';
import { Posts } from '@/types/posts';

export const getAllPosts = async (): Promise<Posts[]> => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id: string): Promise<Posts> => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const getPostsByCategory = async (categoryId: number): Promise<Posts[]> => {
  try {
    const response = await axiosInstance.get(`/posts?category=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    throw error;
  }
}; 