import { combineReducers, configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';

const rootReducer = combineReducers({
  project: projectReducer,
  // other reducers...
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
