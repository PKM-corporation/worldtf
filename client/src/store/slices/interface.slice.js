import { createSlice } from '@reduxjs/toolkit';

export const InterfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        isChatting: false,
    },
    reducers: {
        setIsChatting: (state, action) => {
            state.isChatting = action.payload;
        },
    },
});

export const { setIsChatting } = InterfaceSlice.actions;

export default InterfaceSlice.reducer;
