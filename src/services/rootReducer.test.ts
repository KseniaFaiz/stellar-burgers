import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  test('должен корректно инициализировать начальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        updateUserError: null
      },
      feed: {
        data: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      orderInfo: {
        order: null,
        isLoading: false,
        error: null
      }
    });
  });
});
