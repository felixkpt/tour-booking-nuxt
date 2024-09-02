import { v4 as uuidv4 } from 'uuid';

interface ApiConfig {
    url: (endpoint: string) => string;
}

interface Config {
    name: string;
    api: ApiConfig;
    uuid: () => string;
}

export const appConfig: Config = {
    name: 'TravelMate',
    api: {
        url: (endpoint: string): string => {
            endpoint = endpoint.replace(/\/+/, '/')

            const apiUrl = 'http://tour-booking-be.local';
            return `${apiUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
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
    let formattedValue;

    if (Array.isArray(newValue)) {
        formattedValue = newValue.map((item) => item.id || item);
    } else {
        formattedValue = newValue.id;
    }

    return {
        target: {
            name,
            value: formattedValue,
        },
    };
};
