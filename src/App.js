import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SecureRoute from "./components/SecureRoute";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import PollPage from "./components/PollPage";
import NewPoll from "./components/NewPoll";
import PageNotFound from "./components/PageNotFound";
import Nav from "./components/Nav";

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="container mx-auto py-4">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <SecureRoute>
              <Dashboard />
            </SecureRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <SecureRoute>
              <Leaderboard />
            </SecureRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <SecureRoute>
              <PollPage />
            </SecureRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <SecureRoute>
              <NewPoll />
            </SecureRoute>
          }
        />
        <Route path="/404" exact element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
