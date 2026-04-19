import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { authReducer } from './slices/authSlice';
import { feedReducer } from './slices/feedSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';
import { orderInfoReducer } from './slices/orderInfoSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  orderInfo: orderInfoReducer
});
