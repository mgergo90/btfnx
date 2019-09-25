/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { SET_USER_DATA } from './constants';

// The initial state of the App
export const initialState = fromJS({
  user:
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')),
  initialize: true,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return state.set('user', action.user).set('initialize', false);
    default:
      return state;
  }
}

export default appReducer;
