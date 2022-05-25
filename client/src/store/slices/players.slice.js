import { createSlice } from '@reduxjs/toolkit';

export const PlayersSlice = createSlice({
    name: 'players',
    initialState: {
        playerList: [],
    },
    reducers: {
        initPlayers: (state, action) => {
            state.playerList = action.payload;
            for (const player of action.payload) {
                state[player.id] = player;
            }
        },
        removePlayer: (state, action) => {
            state.playerList.splice(
                state.playerList.findIndex((player) => player.id === action.payload),
                1,
            );
            delete state[action.payload.id];
        },
        addPlayer: (state, action) => {
            state.playerList.push(action.payload);
            state[action.payload.id] = action.payload;
        },
        animPlayer: (state, action) => {
            state[action.payload.id].animation = action.payload.animation;
        },
        movePlayer: (state, action) => {
            state[action.payload.id].position = action.payload.position;
        },
        rotatePlayer: (state, action) => {
            state[action.payload.id].rotation = action.payload.rotation;
        },
        choiceModelPlayer: (state, action) => {
            const index = state.playerList.findIndex((player) => player.id === action.payload.id);
            if (index >= 0) {
                state.playerList[index].model = action.payload.model;
            }
        },
    },
});

export const { initPlayers, removePlayer, addPlayer, animPlayer, movePlayer, choiceModelPlayer, rotatePlayer } = PlayersSlice.actions;

export default PlayersSlice.reducer;
