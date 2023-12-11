import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'http://localhost:8081/api/place';

const initialState = {
    places: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPlaces = createAsyncThunk('places/fetchPlaces', async () => {
    const response = await axios.get('http://localhost:8081/api/place')
    return response.data.items
})

export const addNewPlace = createAsyncThunk('places/addNewPlace', async (initialPlace) => {
    const response = await axios.post('http://localhost:8081/api/place/add', initialPlace)
    return response.data
})

export const updatePlace = createAsyncThunk('places0/updatePlace', async (initialPlace) => {
    const { id } = initialPlace;
    try {
        const response = await axios.put(`http://localhost:8081/api/place/${id}`, initialPlace)
        return response.data
    } catch (err) {
        return err.message;
        //return initialPlace; // only for testing Redux!
    }
})

export const deletePlace = createAsyncThunk('places/deletePlace', async (initialPlace) => {
    const { id } = initialPlace;
    try {
        const response = await axios.delete(`http://localhost:8081/api/place/${id}`)
        if (response?.status === 200) return initialPlace;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.places = state.places.concat(action.payload)
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.status = 'failed'
                console.log(action.error)
                state.error = action.error.message
            })
            .addCase(addNewPlace.fulfilled, (state, action) => {
                state.places.push(action.payload)
            })
            .addCase(updatePlace.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const places = state.places.filter(place => place.id !== id);
                state.places = [...places, action.payload];
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const places = state.places.filter(place => place.id !== id);
                state.places = places;
            })
    }
})

export const selectAllPlaces = (state) => state.places.places;
export const getPlacesStatus = (state) => state.places.status;
export const getPlacesError = (state) => state.places.error;

export const selectPlaceById = (state, placeId) =>
    state.places.places.find(place => place.id === placeId);
export default placesSlice.reducer