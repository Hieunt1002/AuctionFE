import { useMessage } from '@contexts/MessageContext';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://capstoneauctioneer.runasp.net', // Replace with your API base URL
});

// Add a response interceptor to handle both success and error messages
axiosInstance.interceptors.response.use(
  (response) => {
    // Assuming you want to handle success messages globally
    
    return response;
  },
  (error) => {
    // Handle error messages globally
    const { setErrorMessage } = useMessage();
    setErrorMessage(error.message || 'An unknown error occurred');
    return Promise.reject(error);
  }
);

export default axiosInstance;
