import { memo, type FC } from "react";
import { HeaderCart } from "./HeaderCart/HeaderCart";
import { HeaderLogo } from "./HeaderLogo/HeaderLogo";

export const Header: FC = memo(() => {
  return (
    <div className="header">
      <div className="container">
        <HeaderLogo />
        <HeaderCart />
      </div>
    </div>
  );
});
