import { useEffect, type FC, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { PizzaImageBlock } from "./PizzaImageBlock/PizzaImageBlock";
import { PizzaAddBlock } from "./PizzaAddBlock/PizzaAddBlock";
import { PizzaAttributes } from "./PizzaAttributes/PizzaAttributes";
import { PizzaBlockSkeleton } from "./PizzaBlockSkeleton/PizzaBlockSkeleton";
import { viewsOfSort } from "../Sort/SortPopup/SortPopupData";
import { fetchPizzas, selectPizzaData } from "../../../store/slices/pizzaSlice";
import { selectFilter, setFilters } from "../../../store/slices/filterSlice";
import { type AppDispatch } from "../../../store/store";

export const PizzaBlock: FC = () => {
  const fakeArr: unknown[] = [...new Array(9)];
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isSearch = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { activeCategory, activeSortView } = useSelector(selectFilter);

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = qs.parse(search.substring(1));
      const sort = viewsOfSort.find((obj) => obj.sort === params.sortProperty);

      dispatch(
        setFilters({
          activeCategory: Number(params.category) || 0,
          activeSortView: sort ? sort.id : 1,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSearch.current) {
      isSearch.current = false;
      return;
    }

    const queryString = qs.stringify({
      category: activeCategory > 0 ? activeCategory : undefined,
      sortProperty: activeSortView !== 1 ? activeSortView : undefined,
    });

    const newUrl = queryString ? `?${queryString}` : "/";
    const currentUrl = window.location.pathname + window.location.search;

    if (currentUrl !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  }, [activeCategory, activeSortView, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const sortProperty =
      viewsOfSort.find((v) => v.id === activeSortView)?.sort || "";

    dispatch(
      fetchPizzas({
        category: activeCategory,
        sortProperty,
      })
    );
  }, [activeCategory, activeSortView, dispatch]);

  if (status === "loading") {
    return (
      <div className="pizza-block">
        {fakeArr.map((_, index) => (
          <div key={index} className="pizza-item">
            <PizzaBlockSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (status === "succeeded") {
    return (
      <div className="pizza-block">
        {items.map((item) => (
          <div key={item.id} className="pizza-item">
            <PizzaImageBlock
              title={item.title}
              url={item.imageUrl}
              id={item.id}
            />
            <PizzaAttributes
              types={item.types}
              sizes={item.sizes}
              id={item.id}
            />
            <PizzaAddBlock
              price={item.price}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="error-block">
      <h2>Сервер не отвечает</h2>
      <p>Пожалуйста, попробуйте зайти чуть позже</p>
    </div>
  );
};
