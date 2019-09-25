import { DEFAULT_ACTION } from './constants';

/**
 * Dispatched after successfull user login.
 *
 * @return {object} An action object with a type of DEFAULT_ACTION
 */
export const defaultAction = () => ({
  type: DEFAULT_ACTION,
});
