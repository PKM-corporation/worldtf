import { configureStore } from '@reduxjs/toolkit';
import PlayersSlice from './slices/players.slice';

export default configureStore({
    reducer: {
        players: PlayersSlice,
    },
});
