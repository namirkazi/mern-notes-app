import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// ✅ Make sure this import path is correct for your folder structure
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ✅ Make sure this line exists and the key is 'note'
    note: noteReducer,
  },
});