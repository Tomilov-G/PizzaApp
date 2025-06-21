import emptyCart from "../../../../assets/img/empty-cart.png";
import classes from "./EmptyCart.module.scss";
import { BackHomeButton } from "../../../../ui/Buttons/BackHomeButton/BackHomeButton";
import type { FC } from "react";

export const EmptyCart: FC = () => {
  return (
    <div className={classes.emptyCart}>
      <h3 className={classes.title}>Корзина пустая 😕 </h3>
      <p className={classes.description}>
        Вероятней всего, вы не заказывали еще пиццy.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу
      </p>
      <img src={emptyCart} alt="" className={classes.image} />
      <BackHomeButton title="Вернуться на главную"/>
    </div>
  );
};
