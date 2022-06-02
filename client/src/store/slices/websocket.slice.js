import { createSlice } from '@reduxjs/toolkit';

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
            state.error = action.payload;
        },
        clearWebsocketError: (state) => {
            state.error = {};
        },
    },
});

export const { setWebsocketConnected, setWebsocketError, clearWebsocketError } = WebsocketSlice.actions;

export default WebsocketSlice.reducer;
