import { httpClientAuth } from '../http-client';

export const getUserById = async (id) => {
    const result = await httpClientAuth.get(`/users/${id}`);
    return result.data;
};
