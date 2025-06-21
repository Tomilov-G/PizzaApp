import { useSelector } from "react-redux";
import { CartContentItem } from "./CartContentItem/CartContentItem";
import { selectCart } from "../../../../store/slices/cartSlice";
import type { FC } from "react";

export const CartContent: FC = () => {
  const { items } = useSelector(selectCart);
  return (
    <div className="content__items">
      {items.map((obj) => {
        return (
          <CartContentItem
            key={`${obj.id}-${obj.size}-${obj.type}`}
            title={obj.title}
            price={obj.price}
            size={obj.size}
            image={obj.imageUrl}
            count={obj.count}
            type={obj.type}
            id={obj.id}
          />
        );
      })}
    </div>
  );
};
