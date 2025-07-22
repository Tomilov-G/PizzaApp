import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Loader } from "../components/Loader/Loader";
import { HomePage } from "../pages/HomePage";
import PaymentPage from "../pages/PaymentPage";

const CartPage = lazy(() => import("../pages/CartPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));
const PizzaDescriptionPage = lazy(
  () => import("../pages/PizzaDescriptionPage")
);

export const AppRouter = () => (
  <HashRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pizza/:title/:id" element={<PizzaDescriptionPage />} />
          <Route path="basket" element={<CartPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </HashRouter>
);
