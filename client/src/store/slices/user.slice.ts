import { createSlice } from '@reduxjs/toolkit';
import { IUserObject, User } from '../../class/user.class';
import { ISetUserAction, IUserSlice } from '../../interfaces/store.interface';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        updated: 0,
        data: {} as User,
    } as IUserSlice,
    reducers: {
        setUser: (state: IUserSlice, action: ISetUserAction) => {
            state.data = action.payload.user;
            if (action.payload.isSynchronized) state.updated = Math.round(new Date().getTime() / 1000);
        },
        reset: (state: IUserSlice) => {
            state.data = {} as IUserObject;
            state.updated = 0;
        },
    },
});

export const UserSliceActions = UserSlice.actions;

export default UserSlice.reducer;
