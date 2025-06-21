import { useEffect, useRef, useState, type FC } from "react";
import { SortPopup } from "./SortPopup/SortPopup";
import { SortLabel } from "./SortLabel/SortLabel";
import { useSelector } from "react-redux";
import { selectFilter } from "../../../store/slices/filterSlice";

export const Sort: FC = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { activeSortView } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const path = event.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpenPopup(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const togglePopupOnClick = () => {
    setOpenPopup((prev) => !prev);
  };

  return (
    <div className="sort" ref={sortRef}>
      <SortLabel
        activeSortView={activeSortView}
        togglePopupOnClick={togglePopupOnClick}
        openPopup={openPopup}
      />
      <SortPopup
        activeSortView={activeSortView}
        togglePopupOnClick={togglePopupOnClick}
        openPopup={openPopup}
      />
    </div>
  );
};
