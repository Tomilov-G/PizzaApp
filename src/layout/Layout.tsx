import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import "../scss/app.scss";

export const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};
