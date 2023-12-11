import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTypes = createAsyncThunk('types/fetchTypes',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:8081/api/type');
            return response.data.items;
        } catch (err) {
            return rejectWithValue(err);
        }
})

export const addNewType = createAsyncThunk('types/addNewType',
    async (initialType, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8081/api/type', initialType)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response);
        }
})

export const updateType = createAsyncThunk('types/updateType',
    async (initialType, {rejectWithValue}) => {
    const { id } = initialType;
    try {
        const response = await axios.put(`http://localhost:8081/api/type/${id}`, initialType)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response);
    }
})

export const deleteType = createAsyncThunk('types/deleteType', async (initialType) => {
    const { id } = initialType;
    try {
        const response = await axios.delete(`http://localhost:8081/api/type/${id}`)
        if (response?.status === 200) return initialType;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const initialState = {
    types: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}


const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTypes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched types to the array
                state.types = state.types.concat(action.payload)
            })
            .addCase(fetchTypes.rejected, (state, action) => {
                state.status = 'failed'
                console.log(action.payload.error)
                state.error = action.payload
            })
            .addCase(addNewType.fulfilled, (state, action) => {
                state.types.push(action.payload)
            })
            .addCase(addNewType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(updateType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const types = state.types.filter(type => type.id !== id);
                state.types = [...types, action.payload];
            })
            .addCase(updateType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(deleteType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const types = state.types.filter(type => type.id !== id);
                state.types = types;
            })
            .addCase(deleteType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})


export const selectTypeById = (state, typeId) =>
    state.types.types.find(type => type.id === typeId);
export default typesSlice.reducer