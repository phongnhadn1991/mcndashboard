import axiosInstance from '../axios';

export const api_uploadMediaImage = async (formData: unknown) => {
    try {
      const response = await axiosInstance.post('wp/v2/media', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
};