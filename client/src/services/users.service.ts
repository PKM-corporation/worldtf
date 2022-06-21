import { AxiosError } from 'axios';
import { User } from '../class/user.class';
import { httpClientAuth, httpClient } from '../http-client';
import { IApiGetUserDto } from '../interfaces/api.interface';
import { UserSliceActions } from '../store/slices/user.slice';
import store from '../store/store';

export const getUserById = async (id: string): Promise<IApiGetUserDto> => {
    const result = await httpClientAuth.get(`/users/${id}`);
    return result.data as IApiGetUserDto;
};

export const getConnectedPlayers = async () => {
    const result = await httpClient.get('/server/clients');
    return result.data;
};

export const synchronizeUser = async (): Promise<void> => {
    const user = store.getState().user;
    try {
        const userDto = await getUserById(user.data.id);
        const newUser = new User(userDto, user.data.accessToken);
        store.dispatch(UserSliceActions.setUser({ user: newUser.toObject(), isSynchronized: true }));
        window.localStorage.setItem('user', JSON.stringify(newUser));
    } catch (e) {
        if (e instanceof AxiosError && (e.response?.status === 401 || e.status === '401')) {
            store.dispatch(UserSliceActions.reset());
            window.localStorage.removeItem('user');
        } else {
            throw e;
        }
    }
};
