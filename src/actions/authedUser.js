export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

export const setAuthedUser = (authedUser) => {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
};

export const logoutAuthedUser = () => {
  return {
    type: LOGOUT_AUTHED_USER,
  };
};

export const handleLogin = (username, password) => {
  return (dispatch, getState) => {
    const { users } = getState();
    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );

    if (!!user) {
      return dispatch(setAuthedUser(user));
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    return dispatch(logoutAuthedUser());
  };
};
