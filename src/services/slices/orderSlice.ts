import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';
import { clearConstructor } from './constructorSlice';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (_, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const selectedBun = rootState.burgerConstructor.bun;
    const selectedIngredients = rootState.burgerConstructor.ingredients;
    const ingredientIds = [
      ...(selectedBun ? [selectedBun._id] : []),
      ...selectedIngredients.map((ingredient) => ingredient._id),
      ...(selectedBun ? [selectedBun._id] : [])
    ];

    const apiResult = await orderBurgerApi(ingredientIds);
    thunkAPI.dispatch(clearConstructor());
    return {
      ...apiResult.order,
      ingredients: ingredientIds
    } as TOrder;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
