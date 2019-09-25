import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Header } from '../header';

describe('<Header />', () => {
  it('should call authentycate on mount', () => {
    const authCall = jest.fn();
    act(() => {
      mount(
        <Header
          classes={{}}
          initialize
          user={{}}
          tryAuthenticate={authCall}
          logout={jest.fn()}
        />,
      );
    });
    expect(authCall).toBeCalledTimes(1);
  });

  it('should display logut button for loggedin user', () => {
    const component = render(
      <BrowserRouter>
        <Header
          classes={{}}
          initialize={false}
          tryAuthenticate={jest.fn()}
          user={{ id: 2 }}
          logout={jest.fn()}
        />
      </BrowserRouter>,
    );
    expect(component.find('button.logout')).toHaveLength(1);
  });

  it('should display login button for anon user', () => {
    const component = render(
      <BrowserRouter>
        <Header
          classes={{}}
          initialize={false}
          tryAuthenticate={jest.fn()}
          logout={jest.fn()}
        />
      </BrowserRouter>,
    );
    expect(component.find('button.login')).toHaveLength(1);
  });
});
