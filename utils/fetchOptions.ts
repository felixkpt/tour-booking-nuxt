import { appConfig } from "./helpers";

// Function to fetch options based on current dependencies
const fetchOptions = async (source: string, params: object, token?: string) => {
    try {
        const queryParams = new URLSearchParams({ ...params, per_page: 50 }).toString();
        const headers: HeadersInit = {};
        
        // Add Authorization header if token is provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${appConfig.api.url(source)}/?${queryParams}`, {
            headers
        });

        if (!response.ok) throw new Error('Failed to fetch options');
        const data = await response.json();

        return data;
    } catch (error: any) {
        console.error(error);  // Log the error for debugging
        throw error;  // Re-throw the error for higher-level handling
    } finally {
        // Optional cleanup code can be added here
    }
};

export default fetchOptions;
