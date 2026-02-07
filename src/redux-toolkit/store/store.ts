import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../reducers/slice';
import orderReducer from '../reducers/order';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage under the hood
//
// Persist config for the whole store
const persistConfig = {
  key: 'root', // key for localStorage
  storage
  // whitelist or blacklist optional:
  // whitelist: ['cart', 'order'] // slices to persist
  // blacklist: ['someSlice'] // slices NOT to persist
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer
});

// Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
