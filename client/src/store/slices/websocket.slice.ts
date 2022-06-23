import { createSlice } from '@reduxjs/toolkit';
import { IWebsocketErrorObject } from '../../class/websocket.class';
import { ISetBooleanAction, ISetWebsocketErrorAction, IWebsocketSlice } from '../../interfaces/store.interface';

export const WebsocketSlice = createSlice({
    name: 'websocket',
    initialState: {
        connected: false,
        error: {},
    } as IWebsocketSlice,
    reducers: {
        setWebsocketConnected: (state, action: ISetBooleanAction) => {
            state.connected = action.payload;
        },
        setWebsocketError: (state, action: ISetWebsocketErrorAction) => {
            state.error = action.payload;
        },
        clearWebsocketError: (state) => {
            state.error = {} as IWebsocketErrorObject;
        },
    },
});

export const WebsocketSliceActions = WebsocketSlice.actions;

export default WebsocketSlice.reducer;
