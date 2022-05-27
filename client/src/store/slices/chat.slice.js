import { createSlice } from '@reduxjs/toolkit';
import { MessageTypes } from '../../common/constant';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatList: [],
        color: '#000000',
    },
    reducers: {
        setChatColor: (state, action) => {
            state.color = action.payload;
            window.sessionStorage.setItem('chatColor', action.payload);
        },
        addMessage: (state, action) => {
            if (action.payload.type === MessageTypes.Help) {
                action.payload.content = `
                    Command List :
                    - /mp [pseudo] [message]
                    - /tp [pseudo]
                    - /help
                `;
                state.chatList.push(action.payload);
            } else {
                state.chatList.push(action.payload);
            }
        },
        addLog: (state, action) => {
            switch (action.payload.type) {
                case 'Connection':
                    state.chatList.push({
                        type: MessageTypes.Logs,
                        content: `connection`,
                        options: { pseudo: action.payload.pseudo },
                        date: action.payload.date,
                    });
                    break;
                case 'Disconnection':
                    state.chatList.push({
                        type: MessageTypes.Logs,
                        content: `disconnection`,
                        options: { pseudo: action.payload.pseudo },
                        date: action.payload.date,
                    });
                    break;
                case 'Ban':
                case 'Kick':
                    state.chatList.push({
                        type: MessageTypes.Sanction,
                        sanction: action.payload.type,
                        options: action.payload.options,
                        date: action.payload.date,
                    });
                    break;
            }
        },
        addVerbose: (state, action) => {
            state.chatList.push({ type: MessageTypes.Verbose, options: action.payload.options, verboseType: action.payload.type });
        },
    },
});

export const { addMessage, addLog, setChatColor, addVerbose } = ChatSlice.actions;

export default ChatSlice.reducer;
