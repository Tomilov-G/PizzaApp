import classes from "./NotFoundBlock.module.scss";
import { BackHomeButton } from "../../ui/Buttons/BackHomeButton/BackHomeButton";
import type { FC } from "react";

export const NotFoundBlock: FC = () => {
  return (
    <div className={classes.notFound}>
      <span className={classes.smile}>☹️</span>
      <h1 className={classes.title}>Ничего не найдено </h1>
      <BackHomeButton title="Вернуться на главную"/>
    </div>
  );
};
