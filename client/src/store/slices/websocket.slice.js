import { createSlice } from '@reduxjs/toolkit';
import { WebsocketErrorMessages } from '../../common/constant';

export const WebsocketSlice = createSlice({
    name: 'websocket',
    initialState: {
        connected: false,
        error: {},
    },
    reducers: {
        setWebsocketConnected: (state, action) => {
            if (typeof action.payload === 'boolean') state.connected = action.payload;
        },
        setWebsocketError: (state, action) => {
            switch (action.payload.message) {
                case WebsocketErrorMessages.AlreadyLogin:
                    action.payload.message = 'Vous êtes connecté ailleurs';
                    break;
            }
            state.error = action.payload;
        },
    },
});

export const { setWebsocketConnected, setWebsocketError } = WebsocketSlice.actions;

export default WebsocketSlice.reducer;
