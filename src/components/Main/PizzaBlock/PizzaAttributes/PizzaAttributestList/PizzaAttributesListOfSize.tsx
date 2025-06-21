import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSizeForPizza } from "../../../../../store/slices/pizzaAttributesSlice";
import { type RootState, type AppDispatch } from "../../../../../store/store";

interface SizeListProps {
  sizes: number[];
  id: number;
}

export const PizzaAttributesListOfSize: FC<SizeListProps> = ({ sizes, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const activeSize = useSelector(
    (state: RootState) => state.pizzaAttributesSlice.sizeByPizza[id] ?? null
  );

  return (
    <ul>
      {sizes.map((size) => (
        <li
          key={size}
          onClick={() => dispatch(setActiveSizeForPizza({ pizzaId: id, size }))}
          className={size === activeSize ? "active" : ""}
        >
          {size} см.
        </li>
      ))}
    </ul>
  );
};
