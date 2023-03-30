import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "../Redux/Store";
import { Provider } from "react-redux";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
