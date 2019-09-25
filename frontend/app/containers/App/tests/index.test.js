import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import { App } from '../index';

jest.mock('react', () => {
  // eslint-disable-next-line no-shadow
  const React = jest.requireActual('react');
  React.Suspense = ({ children }) => children;
  return React;
});

describe('<App />', () => {
  it('should not render routes while initialize runs', () => {
    const renderedComponent = shallow(<App classes={{}} initialize />);
    expect(renderedComponent.find(Route)).toHaveLength(0);
  });

  it('should render routes after initialize finished', () => {
    const renderedComponent = shallow(<App classes={{}} initialize={false} />);
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});
