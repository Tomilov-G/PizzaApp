import { type FC } from "react";
import { PizzaAttributesListOfDough } from "./PizzaAttributestList/PizzaAttributesListOfDough";
import { PizzaAttributesListOfSize } from "./PizzaAttributestList/PizzaAttributesListOfSize";

export interface PizzaAttributesProps {
  types: number[];
  sizes: number[];
  id: number;
}

export const PizzaAttributes: FC<PizzaAttributesProps> = ({ types, sizes, id }) => {
  return (
    <div className="pizza-block__selector">
      <PizzaAttributesListOfDough types={types} id={id}/>
      <PizzaAttributesListOfSize sizes={sizes} id={id}/>
    </div>
  );
};
