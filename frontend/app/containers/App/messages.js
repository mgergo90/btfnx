/*
 * App Global Messages
 *
 * This contains all the text for the RegistrationPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Required field',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Nickname',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Password',
  },
  minLength: {
    id: `${scope}.minLength`,
    defaultMessage: 'Must be at least {number} character long',
  },
  maxLength: {
    id: `${scope}.maxLength`,
    defaultMessage: 'Can not be longer than {number} character',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
});
