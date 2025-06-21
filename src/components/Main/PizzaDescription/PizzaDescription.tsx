import { useParams } from "react-router-dom";
import { useEffect, useState, type FC } from "react";
import { fetchData } from "../../../utils/fetchData";
import { BASE_URL } from "../../../const/url";
import type { PizzaData } from "../../../types";
import classes from "./PizzaDescription.module.scss";
import { Loader } from "../../Loader/Loader";
import { BackHomeButton } from "../../../ui/Buttons/BackHomeButton/BackHomeButton";

export const PizzaDescription: FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaData | null>(null);

  useEffect(() => {
    const getPizza = async () => {
      try {
        const data: PizzaData = await fetchData(BASE_URL + `/${id}`);
        setPizza(data);
      } catch (error) {
        console.error("Ошибка при загрузке пиццы:", error);
      }
    };
    getPizza();
  }, [id]);
  if (pizza === null) {
    return <Loader />;
  }
  return (
    <div className={classes.descriptionBlock}>
      <img src={pizza?.imageUrl} alt="" className={classes.image} />
      <h2 className={classes.title}>{pizza?.title}</h2>
      <p className={classes.pizzaDescription}>{pizza?.description}</p>
      <h4 className={classes.price}>{pizza?.price} Руб.</h4>
      <BackHomeButton title="Назад"/>
    </div>
  );
};
