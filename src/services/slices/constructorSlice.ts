import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
          return;
        }
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) {
        return;
      }
      const list = [...state.ingredients];
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
      state.ingredients = list;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= state.ingredients.length - 1) {
        return;
      }
      const list = [...state.ingredients];
      [list[index + 1], list[index]] = [list[index], list[index + 1]];
      state.ingredients = list;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export const burgerConstructorReducer = constructorSlice.reducer;
