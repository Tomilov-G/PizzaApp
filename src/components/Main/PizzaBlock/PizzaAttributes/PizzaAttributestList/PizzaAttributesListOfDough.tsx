import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDoughForPizza,
} from "../../../../../store/slices/pizzaAttributesSlice";
import { type RootState, type AppDispatch } from "../../../../../store/store";

interface DoughListProps {
  types: number[];
  id: number;
}

export const PizzaAttributesListOfDough: FC<DoughListProps> = ({ types, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const activeDough = useSelector(
    (state: RootState) =>
      state.pizzaAttributesSlice.doughByPizza[id] ?? null
  );

  return (
    <ul>
      {types.map((type) => (
        <li
          key={type}
          onClick={() =>
            dispatch(setActiveDoughForPizza({ pizzaId: id, dough: type }))
          }
          className={type === activeDough ? "active" : ""}
        >
          {type === 0 ? "тонкое" : "традиционное"}
        </li>
      ))}
    </ul>
  );
};
