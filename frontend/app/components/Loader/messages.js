/*
 * Loader Messages
 *
 * This contains all the text for the Loader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Loader';

export default defineMessages({
  text: {
    id: `${scope}.text`,
    defaultMessage: 'Loading',
  },
});
