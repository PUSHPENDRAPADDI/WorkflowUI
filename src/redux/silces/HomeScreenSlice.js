import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateIdeaModalOpen: false,
    isEditModalOpen: false,
    editData: {},
    currentIdeaName: '',
    homeScreenLoader: false
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
        setEditText: (state, action) => {
            const { key, value } = action.payload;
            state.editData = {
                ...state.editData,
                [key]: value,
            };
        },
        setIdeaName: (state, actions) => {
            state.currentIdeaName = actions.payload;
        },
        setHomeScreenLoader: (state, actions) => {
            state.homeScreenLoader = actions.payload;
        },
    },
});

export const {
    setIsCreateIdeaModalOpen,
    setIsEditModalOpen,
    setEditText,
    setIdeaName,
    setHomeScreenLoader
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;


