import { configureStore } from '@reduxjs/toolkit';
import ChatSlice from './slices/chat.slice';
import WebsocketSlice from './slices/websocket.slice';
import PlayerSlice from './slices/player.slice';
import PlayersSlice from './slices/players.slice';

export default configureStore({
    reducer: {
        websocket: WebsocketSlice,
        players: PlayersSlice,
        chat: ChatSlice,
        player: PlayerSlice,
    },
});
