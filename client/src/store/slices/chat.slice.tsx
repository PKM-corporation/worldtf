import { createSlice } from '@reduxjs/toolkit';
import { IChatObject, ILogObject, IMpObject, IVerboseObject, IWarningObject } from '../../class/chat.class';
import { IChatSlice, IStoreAction } from '../../interfaces/store.interface';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        data: [],
        color: '#000000',
    } as IChatSlice,
    reducers: {
        setChatColor: (state, action: Omit<IStoreAction, 'payload'> & { payload: string }) => {
            state.color = action.payload;
            window.sessionStorage.setItem('chatColor', action.payload);
        },
        push: (
            state,
            action: Omit<IStoreAction, 'payload'> & { payload: IChatObject | IMpObject | ILogObject | IVerboseObject | IWarningObject },
        ) => {
            state.data.push(action.payload);
        },
    },
});

export const ChatSliceActions = ChatSlice.actions;

export default ChatSlice.reducer;
