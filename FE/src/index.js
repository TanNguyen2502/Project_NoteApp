import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import FolderSlice from './Redux/Slice/FolderSlice';
import StatusSlice from './Redux/Slice/StatusSlice';
import UserSlice from './Redux/Slice/UserSlice';
import NoteSlice from './Redux/Slice/NoteSlice';

const reducer = combineReducers({
    dataFolder: FolderSlice,
    statusApp: StatusSlice,
    dataUser: UserSlice,
    dataNote: NoteSlice
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dataUser']
}

const persistedReducer = persistReducer(persistConfig, reducer)
const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(reduxStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate loading={null} persistor={persistor}>
  {/* <React.StrictMode> */}
    <Provider store = { reduxStore }>
      <App />
    </Provider>
  {/* </React.StrictMode> */}
  </PersistGate>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals