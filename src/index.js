import { PropTypes } from  'react';

import classWithName from './classWithName';

export default propsToClassMap => (Component) => {
  const parentClass = Object.getPrototypeOf(Component);

  const classToReturn = classWithName(Component.name, parentClass);

  classToReturn.propTypes = {
    
  };
};
