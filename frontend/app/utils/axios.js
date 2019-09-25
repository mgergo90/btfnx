import axios from 'axios';

import { BACKEND_URL_LOCAL } from 'utils/constants';

export default {
  setupAxios: () => {
    axios.defaults.baseURL = BACKEND_URL_LOCAL;
    axios.defaults.withCredentials = true;
  },
};
