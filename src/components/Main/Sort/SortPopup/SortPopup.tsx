import { type FC } from "react";
import { viewsOfSort } from "./SortPopupData";
import { useDispatch } from "react-redux";
import { setActiveSortView } from "../../../../store/slices/filterSlice";
import type { AppDispatch } from "../../../../store/store";

interface SortPopupProps {
  activeSortView: number;
  openPopup: boolean;
  togglePopupOnClick: () => void;
}

export const SortPopup: FC<SortPopupProps> = ({
  activeSortView,
  openPopup,
  togglePopupOnClick,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  if (!openPopup) return null;
  return (
    <div className="sort__popup">
      <ul>
        {viewsOfSort.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              dispatch(setActiveSortView(item.id));
              togglePopupOnClick();
            }}
            className={item.id === activeSortView ? "active" : ""}
          >
            {item.view}
          </li>
        ))}
      </ul>
    </div>
  );
};
