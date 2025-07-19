import axios from 'axios';
import { appConfig } from "~/utils/helpers";
import { useAuthUser } from '../composables/useAuthUser';

const BASE_URL = appConfig.api.url('');

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
// Get user token
let authUser: any;
const storedUser = localStorage.getItem("authUser");
if (storedUser) {
  authUser = JSON.parse(storedUser);
}
const token = authUser?.token

if (token) {
  headers['Authorization'] = `Bearer ${token.value}`
}

// Base instance configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers,
});


// Function to handle GET requests
export const getData = async (url: string, params?: any) => {
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
