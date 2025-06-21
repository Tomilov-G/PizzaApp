import { useSelector } from "react-redux";
import arrowLeftIcon from "../../../../assets/img/arrow-left.svg";
import classes from "./CartBottom.module.scss";
import { Link } from "react-router-dom";
import { selectCart } from "../../../../store/slices/cartSlice";
import type { FC } from "react";

export const CartBottom: FC = () => {
  const { totalPrice, items } = useSelector(selectCart);
  const finalCount = items
    .map((obj) => obj.count)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="cart__bottom">
      <div className="cart__bottom-details">
        <span>
          Всего пицц: <b>{finalCount} шт.</b>
        </span>
        <span>
          Сумма заказа: <b>{totalPrice} ₽</b>
        </span>
      </div>
      <div className="cart__bottom-buttons">
        <Link
          to={"/"}
          className="button button--outline button--add go-back-btn"
        >
          <img src={arrowLeftIcon} alt="" className={classes.leftArrowIcon} />
          <span>Вернуться назад</span>
        </Link>
        <Link to={"/payment"}>
          <button className="button pay-btn">
            <span>Оплатить сейчас</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
