import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 