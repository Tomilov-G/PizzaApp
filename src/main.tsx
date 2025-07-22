import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router/router";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
