import { useEffect, useState, type Dispatch, type FC } from "react";
import classes from "./PizzaSearchList.module.scss";
import { useSelector } from "react-redux";
import { selectPizzaData } from "../../../../store/slices/pizzaSlice";
import { Link } from "react-router-dom";

interface pizzaSearchProps {
  text: string;
  setText: Dispatch<React.SetStateAction<string>>;
}
export const PizzaSearchList: FC<pizzaSearchProps> = ({ text, setText }) => {
  const [activeList, setActiveList] = useState<boolean>(false);

  const { items } = useSelector(selectPizzaData);
  const pizzaListItems = [...items];

  useEffect(() => {
    if (text !== "" && text !== undefined && text !== null) {
      setActiveList(true);
    } else {
      setActiveList(false);
    }
  }, [text]);

  return (
    <div className={activeList ? classes.pizzaSearchActive : ""}>
      <ul className={classes.pizzaList}>
        {activeList
          ? pizzaListItems
              .filter((p) =>
                p.title.toLowerCase().startsWith(text.trim().toLowerCase())
              )
              .map((pizza) => (
                <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
                  <li className={classes.listItem} onClick={() => setText("")}>
                    {pizza.title + " 🍕"}
                  </li>
                </Link>
              ))
          : null}
      </ul>
    </div>
  );
};
