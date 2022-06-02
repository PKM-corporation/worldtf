import axios from 'axios';

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

const authInterceptor = (config) => {
    config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('accessToken');
    return config;
};

httpClientAuth.interceptors.request.use(authInterceptor);

export { httpClient, httpClientAuth };
