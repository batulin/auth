import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    clients: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await axios.get('http://localhost:8081/api/client')
    return response.data.items
})

export const addNewClient = createAsyncThunk('clients/addNewClient', async (initialClient) => {
    const response = await axios.post('http://localhost:8081/api/client/add', initialClient)
    return response.data
})

export const updateClient = createAsyncThunk('clients/updateClient', async (initialClient) => {
    const { id } = initialClient;
    try {
        const response = await axios.put(`http://localhost:8081/api/client/${id}`, initialClient)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deleteClient = createAsyncThunk('clients/deleteClient', async (initialClient) => {
    const { id } = initialClient;
    try {
        const response = await axios.delete(`http://localhost:8081/api/client/${id}`)
        if (response?.status === 200) return initialClient;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.clients = state.clients.concat(action.payload)
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewClient.fulfilled, (state, action) => {
                state.clients.push(action.payload)
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const clients = state.clients.filter(client => client.id !== id);
                state.clients = [...clients, action.payload];
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const clients = state.clients.filter(client => client.id !== id);
                state.clients = clients;
            })
    }
})

export const selectAllClients = (state) => state.clients.clients;
export const getClientsStatus = (state) => state.clients.status;
export const getClientsError = (state) => state.clients.error;

export const selectClientById = (state, clientId) =>
    state.clients.clients.find(client => client.id === clientId);
export default clientsSlice.reducer;