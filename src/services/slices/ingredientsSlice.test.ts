import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import type { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'i-1',
    name: 'Ингредиент 1',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 10,
    image: '1.png',
    image_large: '1-large.png',
    image_mobile: '1-mobile.png'
  }
];

describe('ingredients slice', () => {
  test('pending: isLoading=true', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('requestId')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled: сохраняет ингредиенты и isLoading=false', () => {
    const state = ingredientsReducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.fulfilled(mockIngredients, 'requestId')
    );

    expect(state.items).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  test('rejected: сохраняет ошибку и isLoading=false', () => {
    const action = fetchIngredients.rejected(new Error('fail'), 'requestId');

    const state = ingredientsReducer(
      { items: [], isLoading: true, error: null },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeTruthy();
  });
});
