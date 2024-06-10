import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { DISPATCH_API_HOST, DRIVER_API_HOST, DRIVER_BACKEND_API_HOST } from '../../env';

// constants for SecureStore keys
export const SECURE_STORE_KEYS = {
    authToken: 'authToken',
};

export enum HttpResponseStatus {
    OK = 200,
    SESSION_OUT = 440,
    UNAUTHORIZED = 401
};

// Helper function to get the access token
const getAccessToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(SECURE_STORE_KEYS.authToken);
};

// Helper function to create initial headers
const createInitialHeader = async () => {
    const accessToken = await getAccessToken();
    return {
        headers: {
            common: {
                Authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
        },
    };
};

// Function to create Axios instance
const createInstance = async (baseURL: string) => {
    const initialHeader = await createInitialHeader();
    return axios.create({
        baseURL,
        ...initialHeader,
    });
};

export let driverAuthInstance: ReturnType<typeof axios.create>;
export let dispatchInstance: ReturnType<typeof axios.create>;
export let driverBackendInstance: ReturnType<typeof axios.create>;

export const initializeInstances = async () => {
    driverAuthInstance = await createInstance(DRIVER_API_HOST as string);
    dispatchInstance = await createInstance(DISPATCH_API_HOST as string);
    driverBackendInstance = await createInstance(DRIVER_BACKEND_API_HOST as string);
};

let logoutFunction: () => void;

export const setLogoutFunction = (logout: () => void) => {
    logoutFunction = logout;
};

const responseBody = (response: AxiosResponse) => response.data;

const errorBody = async (error: AxiosError) => {
    if (error.response?.status === HttpResponseStatus.UNAUTHORIZED) {
        if (logoutFunction) {
            logoutFunction();
        }
    }
    return Promise.reject(error.response);
};


const requests = {
    driverAuthGet: async (url: string) => driverAuthInstance.get(url).then(responseBody).catch(errorBody),
    driverAuthPost: async (url: string, data: any, config?: AxiosRequestConfig) =>
        driverAuthInstance.post(url, data, config).then(responseBody).catch(errorBody),
    dispatchGet: async (url: string) => dispatchInstance.get(url).then(responseBody).catch(errorBody),
    dispatchPost: async (url: string, data: any, config?: AxiosRequestConfig) =>
        dispatchInstance.post(url, data, config).then(responseBody).catch(errorBody),
    driverBackendGet: async (url: string) => driverBackendInstance.get(url).then(responseBody).catch(errorBody),
    driverBackendPost: async (url: string, data: any, config?: AxiosRequestConfig) =>
        driverBackendInstance.post(url, data, config).then(responseBody).catch(errorBody),
};

export default requests;
