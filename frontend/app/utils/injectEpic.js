import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default (epic, key) => WrappedComponent => {
  class EpicInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName = `withEpic(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      // we can't remove and add them later
      if (this.context.store.injectedEpics.includes(key)) {
        return;
      }
      this.context.store.injectedEpics = [
        ...this.context.store.injectedEpics,
        key,
      ];
      this.context.store.epics.next(epic);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(EpicInjector, WrappedComponent);
};
