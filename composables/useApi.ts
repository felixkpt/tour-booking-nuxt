import axios from 'axios'
import { appConfig } from '~/utils/helpers'

export const useApi = () => {
    const BASE_URL = appConfig.api.url('')
    // Get user token
    let authUser: any;
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
        authUser = JSON.parse(storedUser);
    }
    const token = authUser?.token

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token.value}`
    }

    // Create axios instance
    const apiClient = axios.create({
        baseURL: BASE_URL,
        headers
    })

    // Request interceptor to dynamically add auth token
    apiClient.interceptors.request.use((config) => {
        const token = authUser.value?.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    // Response interceptor for error handling
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            // Handle 401 unauthorized errors
            if (error.response?.status === 401) {
                // You might want to clear the user state here
                authUser.value = null
                // Optionally redirect to login
                if (process.client) {
                    window.location.href = '/login'
                }
            }
            return Promise.reject(error)
        }
    )

    // API methods
    const getData = async <T>(url: string, params?: any): Promise<T> => {
        try {
            const response = await apiClient.get<T>(url, { params })
            return response.data
        } catch (error) {
            console.error('Failed to fetch data:', error)
            throw error
        }
    }

    const postData = async <T>(url: string, data: any): Promise<T> => {
        try {
            const response = await apiClient.post<T>(url, data)
            return response.data
        } catch (error) {
            console.error('Failed to post data:', error)
            throw error
        }
    }

    const putData = async <T>(url: string, data: any): Promise<T> => {
        try {
            const response = await apiClient.put<T>(url, data)
            return response.data
        } catch (error) {
            console.error('Failed to update (put) data:', error)
            throw error
        }
    }

    const patchData = async <T>(url: string, data: any): Promise<T> => {
        try {
            const response = await apiClient.patch<T>(url, data)
            return response.data
        } catch (error) {
            console.error('Failed to update (patch) data:', error)
            throw error
        }
    }

    const deleteData = async <T>(url: string): Promise<T> => {
        try {
            const response = await apiClient.delete<T>(url)
            return response.data
        } catch (error) {
            console.error('Failed to delete data:', error)
            throw error
        }
    }

    return {
        get: getData,
        post: postData,
        put: putData,
        patch: patchData,
        delete: deleteData
    }
}