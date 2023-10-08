import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "./actions/authedUser";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger from "./middlewares/logger";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});

describe("App", () => {
    it("Should render App component", () => {
        const app = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(app).toBeDefined();
        expect(app).toMatchSnapshot();
    });

    it("Should show Login page when user not logged in", () => {
        const app = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        const heading = app.getByTestId("login-heading");
        expect(heading).toBeInTheDocument();
    });

    it("Should show Dashboard page when logged in", () => {
        store.dispatch(setAuthedUser({id: "", password: ""}));

        const app = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );

        const heading = app.getByTestId("heading");
        expect(heading).toBeInTheDocument();
    });
});
