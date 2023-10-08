import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Nav from "./Nav";
import { setAuthedUser } from "../actions/authedUser";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import thunk from "redux-thunk";
import logger from "../middlewares/logger";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

describe("Nav", () => {
  it("Should render Nav component", () => {
    store.dispatch(setAuthedUser({ id: "tylermcginnis", password: "" }));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("Should display username of logged in user", () => {
    store.dispatch(setAuthedUser({ id: "tylermcginnis", password: "" }));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );

    const userSpanElement = component.getByTestId("user-information");
    expect(userSpanElement.textContent).toBe("Hi: tylermcginnis !");
  });
});
