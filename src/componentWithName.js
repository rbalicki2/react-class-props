// Adapted from:
// http://stackoverflow.com/questions/35774928/how-does-babel-js-compile-a-class-declaration-into-es2015
// http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
export default (name, ParentClass) => {
  const classCallCheck = (instance, Constructor) => {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a fuction.');
    }
  };

  const applyString = ParentClass
    ? 'ParentClass.apply(this, arguments);'
    : '';

  // eslint-disable-next-line no-new-func
  const Component = new Function('ParentClass', '_classCallCheck',
    `return function ${name}() { ${applyString}`
      + '  _classCallCheck(this, ParentClass);'
      + '}'
  )(ParentClass, classCallCheck);

  Component.prototype = Object.create(ParentClass.prototype);
  Component.prototype.constructor = Component;

  return Component;
};
