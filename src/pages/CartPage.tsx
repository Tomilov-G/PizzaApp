import type { FC } from "react";
import { useSelector } from "react-redux";
import { CartTop } from "../components/Main/Cart/CartTop/CartTop";
import { CartBottom } from "../components/Main/Cart/CartBottom/CartBottom";
import { CartContent } from "../components/Main/Cart/CartContent/CartContent";
import { EmptyCart } from "../components/Main/Cart/EmptyCart/EmptyCart";
import { selectCart } from "../store/slices/cartSlice"


const CartPage: FC = () => {
  const { items } = useSelector(selectCart);
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          {items.length !== 0 ? (
            <>
              <CartTop />
              <CartContent />
              <CartBottom />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
