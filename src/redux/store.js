import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./silces/apiSlice";
import themeReducer from "./silces/themeSlice";
import homeScreenReducer from "./silces/HomeScreenSlice";

export const store = configureStore({
  reducer: {
    apiReducer: apiReducer,
    themeReducer: themeReducer,
    homeScreenReducer: homeScreenReducer,
  },
});

export default store;
