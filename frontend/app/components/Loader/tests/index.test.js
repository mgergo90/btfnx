import React from 'react';
import { render } from 'enzyme';

import Loader from '../index';

describe('<Loader />', () => {
  it('Expect to have unit tests specified', () => {
    expect(render(<Loader />)).toMatchSnapshot();
  });
});
