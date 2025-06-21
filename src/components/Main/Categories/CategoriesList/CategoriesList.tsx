import { type FC } from "react";
import { pizzasCategory } from "./CategoriesListData";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setActiveCategory,
} from "../../../../store/slices/filterSlice";
import type { AppDispatch } from "../../../../store/store";

export const CategoriesList: FC = () => {
  const { activeCategory } = useSelector(selectFilter);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ul>
      {pizzasCategory.map((category) => (
        <li
          key={category.id}
          className={activeCategory === category.id ? "active" : ""}
          onClick={() => dispatch(setActiveCategory(category.id))}
        >
          {category.title}
        </li>
      ))}
    </ul>
  );
};
