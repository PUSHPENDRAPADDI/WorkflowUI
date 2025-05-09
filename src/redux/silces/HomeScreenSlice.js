import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateIdeaModalOpen: false,
};

const homeScreenSlice = createSlice({
    name: 'homeScreen',
    initialState,
    reducers: {
        setIsCreateIdeaModalOpen: (state) => {
            console.log("cliked ");
            state.isCreateIdeaModalOpen = !state.isCreateIdeaModalOpen;
        },
    },
});

export const {
    setIsCreateIdeaModalOpen,
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;


