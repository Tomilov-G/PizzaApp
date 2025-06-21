import trashIcon from "../../../../../assets/img/trash.svg";
import plusIcon from "../../../../../assets/img/plus.svg";
import minusIcon from "../../../../../assets/img/minus.svg";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../store/store";
import {
  minusItem,
  plusItem,
  removeItem,
} from "../../../../../store/slices/cartSlice";
import clsx from "clsx";

interface CartContentItemProps {
  id: number;
  title: string;
  price: number;
  size: number;
  image: string;
  count: number;
  type: "тонкое" | "традиционное";
}
export const CartContentItem: FC<CartContentItemProps> = ({
  id,
  title,
  price,
  image,
  count,
  size,
  type,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const onClickPlus = () => {
    dispatch(plusItem({ id, type, size }));
  };
  const onClickMinus = () => {
    dispatch(minusItem({ id, type, size }));
  };
  const onClickRemove = () => {
    dispatch(removeItem({ id, type, size }));
  };

  return (
    <div className="content__items">
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={image} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{title}</h3>
          <p>
            {type}, {size} см.
          </p>
        </div>
        <div className="cart__item-count">
          <button
            className={clsx(
              "button button--outline button--circle cart__item-count-minus",
              { "cart__item-count-minus--disabled": count === 1 }
            )}
            onClick={onClickMinus}
            disabled={count === 1}
          >
            <img src={minusIcon} alt="" />
          </button>
          <b>{count}</b>
          <button
            className="button button--outline button--circle cart__item-count-plus"
            onClick={onClickPlus}
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <div className="cart__item-price">
          <b>{price * count} ₽</b>
        </div>
        <div className="cart__item-remove" onClick={onClickRemove}>
          <div className="button button--outline button--circle">
            <img src={trashIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};
