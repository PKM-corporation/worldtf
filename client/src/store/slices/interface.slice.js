import { createSlice } from '@reduxjs/toolkit';

export const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        isChatting: false,
        showPlayerlist: false,
        showSettings: false,
    },
    reducers: {
        setIsChatting: (state, action) => {
            state.isChatting = action.payload;
        },
        setShowPlayerlist: (state, action) => {
            state.showPlayerlist = action.payload;
        },
        setShowSettings: (state, action) => {
            state.showSettings = action.payload;
        },
    },
});

export const { setIsChatting, setShowPlayerlist, setShowSettings } = InterfaceSlice.actions;

export default InterfaceSlice.reducer;
