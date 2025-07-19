export type RequestResponseType = {
    status: number;
    data?: any;
    error?: any;
};

export type HttpVerb = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'PATCH' | 'patch' | 'DELETE' | 'delete' | 'HEAD' | 'head' | 'OPTIONS' | 'options' | 'CONNECT' | 'connect' | 'TRACE' | 'trace';

export type GeneralResultType = any

export type MetadataType = {
    page: number;
    per_page: number;
    total_records: number;

} | null

export interface FetchRecordsResponse {
    records: any[];
    metadata: object | null;
}
export interface ServerModelOptionType {
    [key: string]: FetchRecordsResponse
}

export type TourDestination = {
    id: number;
    name: string;
    content: string;
    featured_image: string;
    image_slides: string[];
}

// Define the Tour type
export type TourType = {
    id: number;
    name: string;
    description: string;
    price: number;
    slots: number;
    destination: TourDestination;
}
