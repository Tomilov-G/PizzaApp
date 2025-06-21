import ArrowIcon from "../../../../assets/img/arrow-top.svg";
import { type FC } from "react";
import { viewsOfSort } from "../SortPopup/SortPopupData";

interface SortLabelProps {
  activeSortView: number;
  togglePopupOnClick: () => void;
  openPopup: boolean;
}
export const SortLabel: FC<SortLabelProps> = ({
  activeSortView,
  togglePopupOnClick,
  openPopup,
}) => {
  
  const activeView = viewsOfSort.find((item) => item.id === activeSortView);
  return (
    <div className="sort__label">
      <img
        src={ArrowIcon}
        alt="Стрелка"
        className={openPopup ? "downArrowIcon" : ""}
      />
      <b>Сортировка по:</b>
      <span onClick={() => togglePopupOnClick()}>{activeView?.view}</span>
    </div>
  );
};


