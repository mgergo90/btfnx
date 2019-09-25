import React from 'react';
import { render } from 'enzyme';

import InputField from '../index';

describe('<InputField />', () => {
  it('should match snapshot', () => {
    const field = render(
      <InputField
        classes={{ wrapper: '' }}
        field={{ type: 'textfield' }}
        form={{
          errors: {},
          touched: {},
        }}
      />,
    );
    expect(field).toMatchSnapshot();
  });
});
