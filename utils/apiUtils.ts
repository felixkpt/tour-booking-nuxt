import axios from 'axios';

// Base instance configuration
const apiClient = axios.create({
  baseURL: 'http://tour-booking-be.local',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const fetchData = async (url: string, params?: any) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

// Function to handle POST requests
export const postData = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Failed to post data:', error);
    throw error;
  }
};

// Function to handle PUT requests
export const putData = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update (put) data:', error);
    throw error;
  }
};

// Function to handle patch requests
export const patchData = async (url: string, data: any) => {
  try {
    const response = await apiClient.patch(url, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update (patch) data:', error);
    throw error;
  }
};

// Function to handle DELETE requests
export const deleteData = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error('Failed to delete data:', error);
    throw error;
  }
};
