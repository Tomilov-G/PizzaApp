import { PizzaSearch } from "../PizzaSearch/PizzaSearch";
import Logo from "../../../assets/img/pizza-logo.svg";
import { memo, type FC } from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderLogo.module.scss";

export const HeaderLogo: FC = memo(() => {
  return (
    <div className={classes.headerLogo}>
      <Link to="/" className={classes.link}>
        <img width="38" src={Logo} />
        <h1>Tasty Pizza</h1>
      </Link>
      <PizzaSearch />
    </div>
  );
});
