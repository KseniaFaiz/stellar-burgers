import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp
} from './constructorSlice';
import type { TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const bun: TIngredient = {
  _id: 'bun-id',
  name: 'Булка тестовая',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 100,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png'
};

const main1: TIngredient = {
  _id: 'main-1',
  name: 'Начинка 1',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 50,
  image: 'main1.png',
  image_large: 'main1-large.png',
  image_mobile: 'main1-mobile.png'
};

const main2: TIngredient = {
  _id: 'main-2',
  name: 'Начинка 2',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 60,
  image: 'main2.png',
  image_large: 'main2-large.png',
  image_mobile: 'main2-mobile.png'
};

describe('burgerConstructor slice', () => {
  test('обработка экшена добавления ингредиента (булка)', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual({ ...bun, id: 'test-uuid' });
    expect(state.ingredients).toEqual([]);
  });

  test('обработка экшена добавления ингредиента (начинка)', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(main1));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([{ ...main1, id: 'test-uuid' }]);
  });

  test('обработка экшена удаления ингредиента', () => {
    const withIngredient = burgerConstructorReducer(
      undefined,
      addIngredient(main1)
    );
    const state = burgerConstructorReducer(
      withIngredient,
      removeIngredient('test-uuid')
    );

    expect(state.ingredients).toEqual([]);
  });

  test('обработка экшена изменения порядка ингредиентов (moveIngredientUp)', () => {
    const state1 = burgerConstructorReducer(undefined, addIngredient(main1));
    const state2 = burgerConstructorReducer(state1, addIngredient(main2));

    // uuid мокается одинаково, поэтому проставим разные id вручную
    const fixed = {
      ...state2,
      ingredients: [
        { ...state2.ingredients[0], id: 'id-1' },
        { ...state2.ingredients[1], id: 'id-2' }
      ]
    };

    const moved = burgerConstructorReducer(fixed, moveIngredientUp(1));
    expect(moved.ingredients.map((i) => i._id)).toEqual(['main-2', 'main-1']);
  });
});
