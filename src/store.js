// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';

// const persistedState = localStorage.getItem('authState') 
//   ? JSON.parse(localStorage.getItem('authState')) 
//   : {};

// Redux Persist config
const persistConfig = {
  key: 'root', // key for storage
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem('authState', JSON.stringify(state.auth));
// });

export const persistor = persistStore(store);
export default store;
