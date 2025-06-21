import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { HomePage } from "../pages/HomePage";
import { lazy, Suspense } from "react";
import { Loader } from "../components/Loader/Loader";
import PaymentPage from "../pages/PaymentPage";

const CartPage = lazy(() => import("../pages/CartPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));
const PizzaDescriptionPage = lazy(
  () => import("../pages/PizzaDescriptionPage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/pizza/:title/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <PizzaDescriptionPage />{" "}
          </Suspense>
        ),
      },
      {
        path: "/basket",
        element: (
          <Suspense fallback={<Loader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
