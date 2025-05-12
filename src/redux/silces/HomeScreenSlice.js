import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateIdeaModalOpen: false,
};

const homeScreenSlice = createSlice({
    name: 'homeScreen',
    initialState,
    reducers: {
        setIsCreateIdeaModalOpen: (state) => {
            state.isCreateIdeaModalOpen = !state.isCreateIdeaModalOpen;
        },
    },
});

export const {
    setIsCreateIdeaModalOpen,
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;


