import axios, { AxiosError } from 'axios';
import { appConfig } from './helpers';
import { publish } from "~/components/BaseComponents/utils/pubSub";

export type AutoResponseType<T> = {
    status: number;
    data?: T;
    error?: any;
};

export async function autoRequest<T>(
    action: string,
    method: string,
    formData?: any,
    token?: string
): Promise<AutoResponseType<T>> {
    try {
        const url = appConfig.api.url(action);

        // Prepare request config
        const config: any = {
            method,
            url,
            data: formData,
        };

        // Add token to headers if it is provided
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        // Make the request
        const response = await axios(config);

        // Publish autoRequestDone event with response
        publish('autoRequestDone', {
            status: response.status,
            data: response.data,
            error: undefined, // No error if we reach here
        });

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const errorData = axiosError.response?.data || axiosError?.message;

            // Publish autoRequestDone event with error details
            publish('autoRequestDone', {
                status: axiosError.response?.status || 500,
                data: undefined, // No data if there's an error
                error: errorData,
            });

            return {
                status: axiosError.response?.status || 500,
                error: errorData,
            };
        } else {
            const internalError = (error as Error).message || 'Internal Server Error';

            // Publish autoRequestDone event with internal error
            publish('autoRequestDone', {
                status: 500,
                data: undefined, // No data if there's an error
                error: internalError,
            });

            return {
                status: 500,
                error: internalError,
            };
        }
    }
}
