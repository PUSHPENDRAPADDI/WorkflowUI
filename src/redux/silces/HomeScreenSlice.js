import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateIdeaModalOpen: false,
    isEditModalOpen: false,
    editData: '',
    currentIdeaName: ''
};

const homeScreenSlice = createSlice({
    name: 'homeScreen',
    initialState,
    reducers: {
        setIsCreateIdeaModalOpen: (state) => {
            state.isCreateIdeaModalOpen = !state.isCreateIdeaModalOpen;
        },
        setIsEditModalOpen: (state, actions) => {
            state.isEditModalOpen = !state.isEditModalOpen;
            state.editData = actions.payload;
        },
        setEditText: (state, actions) => {
            state.editData = actions.payload;
        },
        setIdeaName: (state, actions) => {
            state.currentIdeaName = actions.payload;
        }
    },
});

export const {
    setIsCreateIdeaModalOpen,
    setIsEditModalOpen,
    setEditText,
    setIdeaName
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;


