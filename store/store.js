// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Add this line
import userReducer from './slices/userSlice'; 
import subscriptionPlanReducer from './slices/subscriptionPlanSlice';
import gymReducer from './slices/gymSlice';
import memberReducer from './slices/memberSlice';
import membershipPlanReducer from './slices/membershipPlanSlice';
import trainerReducer from './slices/trainerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    subscriptionPlans: subscriptionPlanReducer, 
    gyms: gymReducer,
    members: memberReducer,
    membershipPlans: membershipPlanReducer,
    trainers: trainerReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;