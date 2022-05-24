import { httpClient, httpClientAuth } from '../http-client';

export const loginUser = async (login, password) => {
    const result = await httpClient.post('/auth/login', { username: login, password });
    return result.data;
};

export const logoutUser = async () => {
    const result = await httpClientAuth.get('/auth/logout');
    return result.data;
};

export const signInUser = async (pseudo, email, password) => {
    const result = await httpClient.post('/auth/signin', { pseudo, email, password });
    return result.data;
};
