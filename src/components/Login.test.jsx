import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import thunk from "redux-thunk";
import logger from "../middlewares/logger";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

describe("Login", () => {
  it("Should render Login component", () => {
    const login = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(login).toBeDefined();
    expect(login).toMatchSnapshot();
  });

  it("Should clear input field after clicking submit button", async () => {
    await store.dispatch(handleInitialData());

    const login = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const loginHeading = login.getByTestId("login-heading");
    const usernameInput = login.getByTestId("username");
    const passwordInput = login.getByTestId("password");
    const submitButton = login.getByTestId("submit");

    expect(loginHeading).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "tylermcginnis" } });
    fireEvent.change(passwordInput, { target: { value: "wronguserpassword" } });
    expect(usernameInput.value).toBe("tylermcginnis");
    expect(passwordInput.value).toBe("wronguserpassword");

    fireEvent.click(submitButton);
    expect(loginHeading).toBeInTheDocument();
    expect(usernameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
