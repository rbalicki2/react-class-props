/* eslint-disable no-new-func */
export default (name, parentClass) => {
  if (parentClass) {
    return Function(`return function ${name}() { parentClass.apply(this, arguments); }`)();
  }

  return Function(`return function${name}() {}`)();
};
