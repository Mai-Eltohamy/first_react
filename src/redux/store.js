import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskslice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
