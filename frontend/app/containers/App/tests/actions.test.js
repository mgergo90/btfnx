import {
  SET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  TRY_AUTHENTICATE,
} from '../constants';

import {
  setUserData,
  loginUser,
  logoutUser,
  tryAuthenticate,
} from '../actions';

describe('App Actions', () => {
  describe('setUserData', () => {
    it('should return with user data', () => {
      const user = 'userData';
      const expectedResult = {
        type: SET_USER_DATA,
        user,
      };

      expect(setUserData(user)).toEqual(expectedResult);
    });
  });

  describe('loginUser', () => {
    it('should return the login credentials and formActions', () => {
      const credentials = 'credentials';
      const formActions = 'formActions';
      const expectedResult = {
        type: LOGIN_USER,
        credentials,
        formActions,
      };

      expect(loginUser(credentials, formActions)).toEqual(expectedResult);
    });
  });

  describe('logoutUser', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGOUT_USER,
      };

      expect(logoutUser()).toEqual(expectedResult);
    });
  });

  describe('tryAuthenticate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TRY_AUTHENTICATE,
      };

      expect(tryAuthenticate()).toEqual(expectedResult);
    });
  });
});
