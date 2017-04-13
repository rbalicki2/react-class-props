/* eslint-disable no-new-func */
export default (name, ParentClass) => {
  const classCallCheck = (instance, Constructor) => {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a fuction.');
    }
  };
  let Component;
  if (ParentClass) {
    Component = new Function('ParentClass', '_classCallCheck',
      `return function ${name}() {`
        + '  _classCallCheck(this, ParentClass);'
        + '  ParentClass.apply(this, arguments);'
        + '}'
    )(ParentClass, classCallCheck);
  } else {
    Component = new Function(`return function ${name}() {}`)();
  }

  Component.prototype = Object.create(ParentClass.prototype);
  Component.prototype.constructor = Component;

  return Component;
};
