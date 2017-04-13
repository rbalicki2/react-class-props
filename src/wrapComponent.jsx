import React, { PropTypes } from 'react';

import classWithName from './classWithName';

const mapObjectValuesToValue = (obj, value) => Object.keys(
  obj)
  .reduce(
    (accum, key) => ({
      ...accum,
      [key]: value,
    }),
    {}
  );

export default propsToClassMap => (Component) => {
  const parentClass = Object.getPrototypeOf(Component);
  const WrappedComponent = classWithName(Component.name, parentClass);

  const additionalPropTypes = mapObjectValuesToValue(
    propsToClassMap,
    PropTypes.string,
  );

  WrappedComponent.propTypes = {
    ...Component.propTypes,
    className: PropTypes.string,
    ...additionalPropTypes,
  };

  WrappedComponent.prototype.render = () => {
    return <div>asdf</div>;
  };

  return WrappedComponent;
};
