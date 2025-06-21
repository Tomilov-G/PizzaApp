import trashIcon from "../../../../assets/img/trash.svg";
import cartIcon from "../../../../assets/img/Cart.svg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { clearItems } from "../../../../store/slices/cartSlice";
import type { FC } from "react";

export const CartTop: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="cart__top">
      <h2 className="content__title">
        <img src={cartIcon} alt="" />
        Корзина
      </h2>
      <div className="cart__clear" onClick={() => dispatch(clearItems())}>
        <img src={trashIcon} alt="" />
        <span>Очистить корзину</span>
      </div>
    </div>
  );
};
