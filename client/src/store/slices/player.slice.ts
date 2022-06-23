import { createSlice } from '@reduxjs/toolkit';
import { TAnimation } from '../../interfaces/model.interface';
import { ICoordinates } from '../../interfaces/player.interface';
import { IPlayerSlice, ISetBooleanAction, IStoreAction } from '../../interfaces/store.interface';

export const PlayerSlice = createSlice({
    name: 'player',
    initialState: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        currentAnimation: 'Idle',
        sprinting: false,
        falling: false,
        isMoveBackward: false,
        isMoveForward: false,
        isMoveLeft: false,
        isMoveRight: false,
        jump: false,
        speed: 0,
        timeToJump: 0,
    } as IPlayerSlice,
    reducers: {
        setPosition: (state, action: Omit<IStoreAction, 'payload'> & { payload: ICoordinates }) => {
            state.position.x = action.payload.x;
            state.position.y = action.payload.y;
            state.position.z = action.payload.z;
        },
        setRotation: (state, action: Omit<IStoreAction, 'payload'> & { payload: ICoordinates }) => {
            state.rotation.x = action.payload.x;
            state.rotation.y = action.payload.y;
            state.rotation.z = action.payload.z;
        },
        setCurrentAnimation: (state, action: Omit<IStoreAction, 'payload'> & { payload: TAnimation }) => {
            state.currentAnimation = action.payload;
        },
        setSprinting: (state, action: ISetBooleanAction) => {
            state.sprinting = action.payload;
        },
        setJump: (state, action: ISetBooleanAction) => {
            state.jump = action.payload;
        },
        setFalling: (state, action: ISetBooleanAction) => {
            state.falling = action.payload;
        },
        setIsMoveBackward: (state, action: ISetBooleanAction) => {
            state.isMoveBackward = action.payload;
        },
        setIsMoveForward: (state, action: ISetBooleanAction) => {
            state.isMoveForward = action.payload;
        },
        setIsMoveLeft: (state, action: ISetBooleanAction) => {
            state.isMoveLeft = action.payload;
        },
        setIsMoveRight: (state, action: ISetBooleanAction) => {
            state.isMoveRight = action.payload;
        },
        setSpeed: (state, action: Omit<IStoreAction, 'payload'> & { payload: number }) => {
            state.speed = action.payload;
        },
        setTimeToJump: (state, action: Omit<IStoreAction, 'payload'> & { payload: number }) => {
            state.timeToJump = action.payload;
        },
    },
});

export const PlayerSliceActions = PlayerSlice.actions;

export default PlayerSlice.reducer;
