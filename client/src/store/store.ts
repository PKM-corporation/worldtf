import { configureStore } from '@reduxjs/toolkit';
import ChatSlice from './slices/chat.slice';
import WebsocketSlice from './slices/websocket.slice';
import PlayerSlice from './slices/player.slice';
import PlayersSlice from './slices/players.slice';
import UserSlice, { UserSliceActions } from './slices/user.slice';
import InterfaceSlice from './slices/interface.slice';
import { User } from '../class/user.class';
import SceneSlice from './slices/scene.slice';

const store = configureStore({
    reducer: {
        user: UserSlice,
        websocket: WebsocketSlice,
        players: PlayersSlice,
        chat: ChatSlice,
        player: PlayerSlice,
        interface: InterfaceSlice,
        scene: SceneSlice,
    },
});

const userInLocalStorage = window.localStorage.getItem('user');
if (userInLocalStorage) {
    store.dispatch(UserSliceActions.setUser({ user: JSON.parse(userInLocalStorage) as User }));
}

export default store;
