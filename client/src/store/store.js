import { configureStore } from '@reduxjs/toolkit';
import ChatSlice from './slices/chat.slice';
import PlayersSlice from './slices/players.slice';

export default configureStore({
    reducer: {
        players: PlayersSlice,
        chat: ChatSlice,
    },
});
