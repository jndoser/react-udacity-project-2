import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/index";
import { BrowserRouter } from "react-router-dom";
import logger from "./middlewares/logger";
import thunk from "redux-thunk";
const container = document.getElementById("root");
const root = createRoot(container);

const store = configureStore({
  reducer: reducer,
  middleware: [thunk, logger],
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
