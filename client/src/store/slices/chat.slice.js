import { createSlice } from '@reduxjs/toolkit';
import { MessageTypes } from '../../common/constant';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatList: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.chatList.push(action.payload);
        },
    },
});

export const { addMessage } = ChatSlice.actions;

export default ChatSlice.reducer;
