import { createSlice } from '@reduxjs/toolkit';
import { IPlayerObject } from '../../class/player.class';
import { ICoordinates, TAnimation } from '../../interfaces/player.interface';
import { IPlayersSlice, IStoreAction } from '../../interfaces/store.interface';

export const PlayersSlice = createSlice({
    name: 'players',
    initialState: {
        updated: 0,
        ids: [],
        data: {},
    } as IPlayersSlice,
    reducers: {
        setPlayersId: (state, action: Omit<IStoreAction, 'payload'> & { payload: string[] }) => {
            state.ids = action.payload;
            state.updated = Math.round(new Date().getTime() / 1000);
        },
        setPlayer: (state, action: Omit<IStoreAction, 'payload'> & { payload: IPlayerObject }) => {
            state.data[action.payload.id] = action.payload;
        },
        removePlayer: (state, action: Omit<IStoreAction, 'payload'> & { payload: string }) => {
            state.ids.splice(
                state.ids.findIndex((id) => id === action.payload),
                1,
            );
            delete state.data[action.payload];
        },
        setAnimation: (state, action: Omit<IStoreAction, 'payload'> & { payload: { id: string; animation: TAnimation } }) => {
            state.data[action.payload.id].animation = action.payload.animation;
        },
        setPosition: (state, action: Omit<IStoreAction, 'payload'> & { payload: { id: string; position: ICoordinates } }) => {
            state.data[action.payload.id].position = action.payload.position;
        },
        setRotation: (state, action: Omit<IStoreAction, 'payload'> & { payload: { id: string; rotation: ICoordinates } }) => {
            state.data[action.payload.id].rotation = action.payload.rotation;
        },
    },
});

export const PlayersSliceActions = PlayersSlice.actions;

export default PlayersSlice.reducer;
