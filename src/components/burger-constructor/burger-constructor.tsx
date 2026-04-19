import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructor, selectOrderState, selectUser } from '@selectors';
import {
  closeOrderModal as closeOrderModalAction,
  createOrder
} from '../../services/slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authorizedUser = useSelector(selectUser);
  const selectedConstructorItems = useSelector(selectConstructor);
  const { orderRequest, orderModalData } = useSelector(selectOrderState);

  const handleOrderClick = () => {
    if (!selectedConstructorItems.bun || orderRequest) return;
    if (!authorizedUser) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(createOrder());
  };
  const handleOrderModalClose = () => {
    dispatch(closeOrderModalAction());
  };

  const totalPrice = useMemo(
    () =>
      (selectedConstructorItems.bun
        ? selectedConstructorItems.bun.price * 2
        : 0) +
      selectedConstructorItems.ingredients.reduce(
        (accumulator: number, ingredient: TConstructorIngredient) =>
          accumulator + ingredient.price,
        0
      ),
    [selectedConstructorItems]
  );

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={selectedConstructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleOrderModalClose}
    />
  );
};
