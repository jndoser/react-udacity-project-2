import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import thunk from "redux-thunk";
import logger from "../middlewares/logger";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

describe("NewPoll", () => {
  it("Should render NewPoll component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("Should display all elements", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionLabel = component.getByTestId("firstOptionLabel");
    const firstOptionInput = component.getByTestId("firstOption");
    const secondOptionLabel = component.getByTestId("secondOptionLabel");
    const secondOptionInput = component.getByTestId("secondOption");
    const submitButton = component.getByTestId("submit-poll");

    expect(firstOptionLabel.textContent).toBe("First Option");
    expect(secondOptionLabel.textContent).toBe("Second Option");
    expect(submitButton.textContent).toBe("Submit");

    fireEvent.change(firstOptionInput, { target: { value: "First Option" } });
    fireEvent.change(secondOptionInput, {
      target: { value: "Second Option" },
    });
    expect(firstOptionInput.value).toBe("First Option");
    expect(secondOptionInput.value).toBe("Second Option");
  });
});
