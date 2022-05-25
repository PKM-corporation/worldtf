import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        updated: 0,
        id: '',
        pseudo: '',
        email: '',
        avatar: '',
        accessToken: '',
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload.id && action.payload.pseudo && action.payload.email) {
                state.id = action.payload.id;
                state.pseudo = action.payload.pseudo;
                state.email = action.payload.email;
                if (action.payload.avatar) state.avatar = action.payload.avatar;
                if (action.payload.accessToken) {
                    state.accessToken = action.payload.accessToken;
                    window.localStorage.setItem('accessToken', action.payload.accessToken);
                }
                state.updated = Math.round(new Date().getTime() / 1000);
                window.localStorage.setItem('userId', state.id);
            } else {
                throw new Error('InvalidUser');
            }
        },
        removeUser: (state) => {
            state.id = '';
            state.pseudo = '';
            state.email = '';
            state.avatar = '';
            state.updated = 0;
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('accessToken');
        },
    },
});

export const { setUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
