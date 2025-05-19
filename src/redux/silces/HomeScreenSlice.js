import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCreateIdeaModalOpen: false,
    isEditModalOpen: false,
    editData: {},
    currentIdeaName: '',
    homeScreenLoader: false,
    personaEditModalOpen: false,
    personaEditDetails: {},
    featureEditModalOpen: false,
    featureEditDetails: {},
    isFeedbackOpen: false,
    productEditModalOpen: false,
    productEditModalData: {}
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
        setPersonaEditModalOpen: (state, actions) => {
            state.personaEditModalOpen = !state.personaEditModalOpen;
            state.personaEditDetails = actions.payload;
        },
        setFeatureEditModalOpen: (state, actions) => {
            state.featureEditModalOpen = !state.featureEditModalOpen;
            state.featureEditDetails = actions.payload;
        },
        setIsFeedbackOpen: (state, actions) => {
            state.isFeedbackOpen = !state.isFeedbackOpen
        },
        setProductEditModal: (state, actions) => {
            state.productEditModalOpen = !state.productEditModalOpen;
            state.productEditModalData = actions.payload;
        },
        setEditTextForProduct: (state, action) => {
            const { key, value } = action.payload;
            state.productEditModalData = {
                ...state.productEditModalData,
                [key]: value,
            };
        },
    },
});

export const {
    setIsCreateIdeaModalOpen,
    setIsEditModalOpen,
    setEditText,
    setIdeaName,
    setHomeScreenLoader,
    setPersonaEditModalOpen,
    setFeatureEditModalOpen,
    setIsFeedbackOpen,
    setProductEditModal,
    setEditTextForProduct
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;


