import type { FC } from "react";
import { useSelector } from "react-redux";
import { selectFilter } from "../store/slices/filterSlice";
import { Categories } from "../components/Main/Categories/Categories";
import { PizzaBlock } from "../components/Main/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Main/Sort/Sort";
import { pizzasCategory } from "../components/Main/Categories/CategoriesList/CategoriesListData";

export const HomePage: FC = () => {
  const { activeCategory } = useSelector(selectFilter);
  const acitveCategory = pizzasCategory.find(
    (pizza) => pizza.id === activeCategory
  );
  return (
    <main>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">{acitveCategory?.title}</h2>
          <div className="content__items">
            <PizzaBlock />
          </div>
        </div>
      </div>
    </main>
  );
};
