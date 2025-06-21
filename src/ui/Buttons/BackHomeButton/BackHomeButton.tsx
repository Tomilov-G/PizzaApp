import { Link } from "react-router-dom";
import classes from "./BackHomeButton.module.scss";
import type { FC } from "react";

interface BackHomeButtonProps {
  title: string;
}
export const BackHomeButton: FC<BackHomeButtonProps> = ({ title }) => {
  return (
    <Link to={"/"} className={classes.link}>
      <button type="button" className={classes.button}>
        {title}
      </button>
    </Link>
  );
};
