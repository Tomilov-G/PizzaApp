import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../../store/slices/cartSlice";
import CartIcon from "../../../assets/img/Cart.svg";
import { memo, useEffect, useRef, type FC } from "react";

export const HeaderCart: FC = memo(() => {
  const { items, totalPrice } = useSelector(selectCart);
  const finalCount = items
    .map((obj) => obj.count)
    .reduce((acc, curr) => acc + curr, 0);

  const { pathname } = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items, totalPrice]);
  return (
    <>
      {pathname !== "/basket" && (
        <div className="header__cart">
          <Link to="/basket" className="button button--cart">
            <span>{totalPrice}</span>
            <div className="button__delimiter"></div>
            <img src={CartIcon} alt="" />
            <span>{finalCount}</span>
          </Link>
        </div>
      )}
    </>
  );
});
