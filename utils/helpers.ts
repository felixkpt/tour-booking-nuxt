import { v4 as uuidv4 } from 'uuid';

interface ApiConfig {
    url: (endpoint: string) => string;
}

interface Config {
    name: string;
    api: ApiConfig;
    uuid: () => string;
}

var be =  'https://tour-booking-laravel-sandbox-830880690332.us-central1.run.app'
var be =  'http://127.0.0.1:8000'

export const appConfig: Config = {
    name: 'TravelMate',
    api: {
        url: (endpoint: string): string => {
            endpoint = endpoint ? endpoint.replace(/\/+/, '/').replace(/^\/+/, '') : endpoint

            const apiUrl = be;
            return `${apiUrl.replace(/\/+$/, '')}/${endpoint}`;
        }
    },
    uuid: () => uuidv4()
};

export const themeOption = 'dark';
export const defaultTheme = 'dark';

export function getModelTag(apiEndpoint: string) {
    const tag = apiEndpoint.endsWith('/') && apiEndpoint.indexOf('/') !== apiEndpoint.lastIndexOf('/')
        ? apiEndpoint.slice(0, -1)
        : apiEndpoint;
    return tag
}

export const formatEvent = (name: string, newValue: any) => {
    let formattedValue: any[];

    if (Array.isArray(newValue)) {
        formattedValue = newValue.map((item) => item.id || item);
    } else {
        formattedValue = newValue.id || newValue;
    }

    return {
        target: {
            name,
            value: formattedValue,
        },
    };
};
