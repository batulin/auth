import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {fetchPlaces} from "./store/placesSlice";
import {fetchTypes} from "./store/typesSlice";
import {fetchClients} from "./store/clientsSlice";

store.dispatch(fetchPlaces());
store.dispatch(fetchTypes());
store.dispatch(fetchClients());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
