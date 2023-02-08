import type { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import store from './store/store';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URI,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const httpClientAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URI,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// const authInterceptor = (config: AxiosRequestConfig) => {
//     if (store.getState().user.data.accessToken && config.headers) {
//         config.headers.Authorization = `Bearer ${store.getState().user.data.accessToken}`;
//     }
//     return config;
// };

const authInterceptor = (config: AxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    if (store.getState().user.data.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${store.getState().user.data.accessToken}`;
    }
    return { ...config, headers: config.headers as AxiosRequestHeaders };
    // return config;
};

httpClientAuth.interceptors.request.use(authInterceptor);

export { httpClient, httpClientAuth };
