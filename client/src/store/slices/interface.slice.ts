import { createSlice } from '@reduxjs/toolkit';
import { IInterfaceSlice, ISetBooleanAction } from '../../interfaces/store.interface';

export const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        isChatting: false,
        showPlayerlist: false,
        showSettings: false,
    } as IInterfaceSlice,
    reducers: {
        setIsChatting: (state: IInterfaceSlice, action: ISetBooleanAction) => {
            state.isChatting = action.payload;
        },
        setShowPlayerlist: (state: IInterfaceSlice, action: ISetBooleanAction) => {
            state.showPlayerlist = action.payload;
        },
        setShowSettings: (state: IInterfaceSlice, action: ISetBooleanAction) => {
            state.showSettings = action.payload;
        },
    },
});

export const InterfaceSliceActions = InterfaceSlice.actions;

export default InterfaceSlice.reducer;
