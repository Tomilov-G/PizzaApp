import { useCallback, type FC } from "react";
import plusIcon from "../../../../assets/img/plus.svg";
import { AddInCartButton } from "../../../../ui/Buttons/AddInCartButton";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../store/store";
import { addItem } from "../../../../store/slices/cartSlice";
import type { CartItem } from "../../../../types";

interface PizzaAddBlockProps {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
}

export const PizzaAddBlock: FC<PizzaAddBlockProps> = ({
  id,
  price,
  title,
  imageUrl,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sizeByPizza, doughByPizza } = useSelector(
    (state: RootState) => state.pizzaAttributesSlice
  );
  const count = useSelector(
    (state: RootState) =>
      state.cartSlice.items.find((obj) => obj.id === id)?.count ?? 0
  );

  const currentSize = sizeByPizza[id] ?? 0;
  const currentDough = doughByPizza[id] ?? 0;

  const onClickAddPizza = useCallback(() => {
    const item: Omit<CartItem, "count"> = {
      id,
      title,
      price,
      imageUrl,
      type: currentDough === 0 ? "тонкое" : "традиционное",
      size: currentSize,
    };
    dispatch(addItem(item));
  }, [dispatch, id, title, price, imageUrl, currentDough, currentSize]);

  return (
    <div className="pizza-block__bottom">
      <div className="pizza-block__price">от {price} ₽</div>
      <AddInCartButton
        title="Добавить"
        src={plusIcon}
        alt="+"
        onClick={onClickAddPizza}
        value={count}
      />
    </div>
  );
};
