import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PizzaImageBlock.module.scss";

interface PizzaBlockProps {
  title: string;
  url: string;
  id: number;
}

export const PizzaImageBlock: FC<PizzaBlockProps> = ({ title, url, id }) => {
  const navigate = useNavigate();
  const pizzaDescriptionClick = () => {
    navigate(`/pizza/${title}/${id}`);
  };
  return (
    <>
      <img
        src={url}
        alt="Картинка"
        className={classes.image}
        onClick={pizzaDescriptionClick}
      />
      <h3>{title}</h3>
    </>
  );
};
