import {
  SET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  TRY_AUTHENTICATE,
} from './constants';

/**
 * Dispatched after successfull user login.
 *
 * @return {object} An action object with a type of SET_USER_DATA
 */
export const setUserData = user => ({
  type: SET_USER_DATA,
  user,
});

export const loginUser = (credentials, formActions) => ({
  type: LOGIN_USER,
  credentials,
  formActions,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const tryAuthenticate = () => ({
  type: TRY_AUTHENTICATE,
});
