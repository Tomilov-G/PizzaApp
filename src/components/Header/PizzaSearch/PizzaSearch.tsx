import { useState, type FC } from "react";
import classes from "./PizzaSearch.module.scss";
import { PizzaSearchList } from "./PizzaSearchList/PizzaSearchList";
import { useLocation } from "react-router-dom";

export const PizzaSearch: FC = () => {
  const [text, setText] = useState<string>("");
  const { pathname } = useLocation();
  {
    if (pathname !== "/basket")
      return (
        <div className={classes.pizzaSearch}>
          <input
            placeholder="Найти пиццу"
            type="text"
            className={classes.input}
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <PizzaSearchList text={text} setText={setText} />
        </div>
      );
  }
};
