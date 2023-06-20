import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../src/features/studentSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, studentReducer)

export const store = configureStore({
    reducer: {
        student: persistedReducer
    }
})

export const persistor = persistStore(store)