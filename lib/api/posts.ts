import axiosInstance from '../axios';
import { Posts } from '@/types/posts';

export type PostsParams = {
  posts_per_page?: number;
  page?: number;
  author?: string;
  post_status?: string;
}

export interface PostsResponse {
  data: Posts[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
}

export const getAllPosts = async (options: {params?: PostsParams} = {}): Promise<PostsResponse> => {
  try {
    const response = await axiosInstance.get('ngoanmc/v1/posts', {
      params: options.params
    });
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

export const getPostBySlug = async (slug: string): Promise<Posts> => {
  try {
    const response = await axiosInstance.get(`ngoanmc/v1/post-detail`, {
      params: {
        slug: slug
      }
    });
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
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