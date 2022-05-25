import { configureStore } from '@reduxjs/toolkit';
import ChatSlice from './slices/chat.slice';
import WebsocketSlice from './slices/websocket.slice';
import PlayerSlice from './slices/player.slice';
import PlayersSlice from './slices/players.slice';
import UserSlice from './slices/user.slice';
import InterfaceSlice from './slices/interface.slice';

export default configureStore({
    reducer: {
        user: UserSlice,
        websocket: WebsocketSlice,
        players: PlayersSlice,
        chat: ChatSlice,
        player: PlayerSlice,
        interface: InterfaceSlice,
    },
});
