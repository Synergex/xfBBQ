import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { store, persistor } from "./redux/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./Spinner";

render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
