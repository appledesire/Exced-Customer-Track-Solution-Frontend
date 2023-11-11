import cartReducer from '@/redux/features/cart';
import { configureStore } from '@reduxjs/toolkit';
import identifyReducer from '@/redux/features/identify';
import screenReducer from '@/redux/features/screen';

export const store = configureStore({
  reducer: {
    cartReducer,
    identifyReducer,
    screenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
