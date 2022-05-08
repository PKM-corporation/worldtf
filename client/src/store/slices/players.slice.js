import { createSlice } from '@reduxjs/toolkit';

export const PlayersSlice = createSlice({
    name: 'players',
    initialState: {
        players: [],
    },
    reducers: {
        initPlayers: (state, action) => {
            state.players = action.payload;
        },
        removePlayer: (state, action) => {
            state.players.splice(
                state.players.findIndex((player) => player.id === action.payload),
                1,
            );
        },
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        animPlayer: (state, action) => {
            const index = state.players.findIndex((player) => player.id === action.payload.id);
            if (index >= 0) {
                state.players[index].animation = action.payload.animation;
            }
        },
        movePlayer: (state, action) => {
            const index = state.players.findIndex((player) => player.id === action.payload.id);
            if (index >= 0) {
                state.players[index].position = action.payload.position;
                state.players[index].rotation = action.payload.rotation;
            }
            state.players = [...state.players];
        },
        choiceModelPlayer: (state, action) => {
            const index = state.players.findIndex((player) => player.id === action.payload.id);
            if (index >= 0) {
                state.players[index].model = action.payload.model;
            }
        },
    },
});

export const { initPlayers, removePlayer, addPlayer, animPlayer, movePlayer, choiceModelPlayer } = PlayersSlice.actions;

export default PlayersSlice.reducer;
