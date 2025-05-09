import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
    name: "api",
    initialState: {},
    reducers: {
        apiRequest: (state, action) => {
            const key = action.payload;
            state[key] = { data: null, loading: true, error: null };
        },
        apiSuccess: (state, action) => {
            const { key, data } = action.payload;
            state[key] = { data, loading: false, error: null };
        },
        apiFailure: (state, action) => {
            const { key, error } = action.payload;
            state[key] = { data: null, loading: false, error };
        },
        resetApi: () => ({}),
    }
});

export const { apiRequest, apiSuccess, apiFailure, resetApi } = apiSlice.actions;
export default apiSlice.reducer;
