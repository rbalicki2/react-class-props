import React from 'react';
import PropTypes from 'prop-types';

import componentWithName from './componentWithName';

const mapObjectValuesToValue = (obj, value) => Object.keys(
  obj)
  .reduce(
    (accum, key) => ({
      ...accum,
      [key]: value,
    }),
    {}
  );

const getClassNamesFromProps = (props, propsToClassMap, className) => ([
  className,
  ...(Object.keys(propsToClassMap)
    .filter(key => props[key])
    .map(key => propsToClassMap[key])
  ),
].join(' '));

const getRemainingProps = (props, disallowedProps) => Object.keys(props)
  .reduce(
    (accum, key) => (!disallowedProps.includes(key)
      ? { ...accum, [key]: props[key] }
      : {}),
    {}
  );

export default propsToClassMap => (Component) => {
  const ParentClass = Object.getPrototypeOf(Component);
  const WrappedComponent = componentWithName(Component.name, ParentClass);

  // Transfer static properties
  Object.assign(WrappedComponent, Component);

  const additionalPropTypes = mapObjectValuesToValue(
    propsToClassMap,
    PropTypes.bool,
  );

  WrappedComponent.propTypes = {
    ...Component.propTypes,
    className: PropTypes.string,
    ...additionalPropTypes,
  };

  WrappedComponent.prototype.render = function render() {
    const { className } = this.props;
    const rest = getRemainingProps(this.props, Object.keys(propsToClassMap));

    return (<Component
      className={getClassNamesFromProps(this.props, propsToClassMap, className)}
      {...rest}
    />);
  };

  return WrappedComponent;
};
