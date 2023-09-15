import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// this is the store of the project with the root reducer
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
