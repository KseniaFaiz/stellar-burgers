import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectOrderState = (state: RootState) => state.order;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUpdateUserError = (state: RootState) =>
  state.auth.updateUserError;

export const selectFeedData = (state: RootState) => state.feed.data;
export const selectFeedOrders = (state: RootState) => state.feed.data.orders;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

export const selectOrderInfo = (state: RootState) => state.orderInfo.order;
