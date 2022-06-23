import { createSlice } from '@reduxjs/toolkit';
import { TTime } from '../../interfaces/scene.interface';
import { ISceneSlice, ISetBooleanAction, IStoreAction } from '../../interfaces/store.interface';

export const SceneSlice = createSlice({
    name: 'scene',
    initialState: {
        isDebug: false,
        time: 0,
        period: 'Morning',
        fog: {
            color: [1, 1, 1],
            far: 150,
            near: 10,
        },
    } as ISceneSlice,
    reducers: {
        setIsDebug: (state, action: ISetBooleanAction) => {
            state.isDebug = action.payload;
        },
        setTime: (state, action: Omit<IStoreAction, 'payload'> & { payload: number }) => {
            state.time = action.payload;
        },
        setPeriod: (state, action: Omit<IStoreAction, 'payload'> & { payload: TTime }) => {
            state.period = action.payload;
        },
        setFogColor: (state, action: Omit<IStoreAction, 'payload'> & { payload: [r: number, g: number, b: number] }) => {
            state.fog.color = action.payload;
        },
        setFogFar: (state, action: Omit<IStoreAction, 'payload'> & { payload: number }) => {
            state.fog.far = action.payload;
        },
        setFogNear: (state, action: Omit<IStoreAction, 'payload'> & { payload: number }) => {
            state.fog.near = action.payload;
        },
    },
});

export const SceneSliceActions = SceneSlice.actions;

export default SceneSlice.reducer;
