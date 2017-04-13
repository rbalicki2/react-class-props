export default (name, parent) => {
  return Function(`return function ${name}() { parent.apply(this, arguments); }`)();
};
