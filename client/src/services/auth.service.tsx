import { User } from '../class/user.class';
import { httpClient, httpClientAuth } from '../http-client';
import { IApiGetUserDto } from '../interfaces/api.interface';
import { UserSliceActions } from '../store/slices/user.slice';
import store from '../store/store';

export const fetchLogin = async (login: string, password: string): Promise<IApiGetUserDto> => {
    const result = await httpClient.post('/auth/login', { username: login, password });
    return result.data as IApiGetUserDto;
};

export const fetchLogout = async () => {
    const result = await httpClientAuth.get('/auth/logout');
    return result.data;
};

export const fetchSignIn = async (pseudo: string, email: string, password: string): Promise<IApiGetUserDto> => {
    const result = await httpClient.post('/auth/signin', { pseudo, email, password });
    return result.data as IApiGetUserDto;
};

export const login = async (login: string, password: string) => {
    const userDto = await fetchLogin(login, password);
    const user = new User(userDto);
    store.dispatch(UserSliceActions.setUser({ user: user.toObject(), isSynchronized: true }));
    window.localStorage.setItem('user', JSON.stringify(user));
};

export const signIn = async (pseudo: string, email: string, password: string) => {
    const userDto = await fetchSignIn(pseudo, email, password);
    const user = new User(userDto);
    store.dispatch(UserSliceActions.setUser({ user: user.toObject(), isSynchronized: true }));
    window.localStorage.setItem('user', JSON.stringify(user));
};

export const logout = async () => {
    await fetchLogout();
    store.dispatch(UserSliceActions.reset());
    window.localStorage.removeItem('user');
};
