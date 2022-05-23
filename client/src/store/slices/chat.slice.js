import { createSlice } from '@reduxjs/toolkit';
export const ChatSlice = createSlice({
    name: 'Chat',
    initialState: {
        tchatList: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.playerList = action.payload;
            for (const message of action.payload) {
                state[(message.message, message.id)] = message;
            }
        },
        addServerMessage: (state, action) => {},
    },
});

export const { addMessage, addServerMessage } = ChatSlice.actions;

export default ChatSlice.reducer;
