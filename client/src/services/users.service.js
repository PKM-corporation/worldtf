import { httpClientAuth, httpClient } from '../http-client';

export const getUserById = async (id) => {
    const result = await httpClientAuth.get(`/users/${id}`);
    return result.data;
};

export const getConnectedPlayers = async () => {
    const result = await httpClient.get('/server/clients');
    return result.data;
};
