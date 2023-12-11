import { configureStore } from "@reduxjs/toolkit";
import placesReducer from './placesSlice';
import typesReducer from './typesSlice';
import clientsReducer from './clientsSlice';
import sidebarReducer from './sidebarSlice';


export const store = configureStore({
    reducer: {
        places: placesReducer,
        sidebar: sidebarReducer,
        clients: clientsReducer,
        types: typesReducer,

    }
})