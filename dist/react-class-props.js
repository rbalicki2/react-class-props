(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-class-props"] = factory(require("react"));
	else
		root["react-class-props"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// Adapted from:
// http://stackoverflow.com/questions/35774928/how-does-babel-js-compile-a-class-declaration-into-es2015
// http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
exports.default = function (name, ParentClass) {
  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a fuction.');
    }
  };

  var applyString = ParentClass ? 'ParentClass.apply(this, arguments);' : '';

  // eslint-disable-next-line no-new-func
  var Component = new Function('ParentClass', '_classCallCheck', 'return function ' + name + '() { ' + applyString + '  _classCallCheck(this, ParentClass);' + '}')(ParentClass, classCallCheck);

  Component.prototype = Object.create(ParentClass.prototype);
  Component.prototype.constructor = Component;

  return Component;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _componentWithName = __webpack_require__(0);

var _componentWithName2 = _interopRequireDefault(_componentWithName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapObjectValuesToValue = function mapObjectValuesToValue(obj, value) {
  return Object.keys(obj).reduce(function (accum, key) {
    return _extends({}, accum, _defineProperty({}, key, value));
  }, {});
};

var getClassNamesFromProps = function getClassNamesFromProps(props, propsToClassMap, className) {
  return [className].concat(_toConsumableArray(Object.keys(propsToClassMap).filter(function (key) {
    return props[key];
  }).map(function (key) {
    return propsToClassMap[key];
  }))).join(' ');
};

var getRemainingProps = function getRemainingProps(props, disallowedProps) {
  return Object.keys(props).reduce(function (accum, key) {
    return !disallowedProps.includes(key) ? _extends({}, accum, _defineProperty({}, key, props[key])) : {};
  }, {});
};

exports.default = function (propsToClassMap) {
  return function (Component) {
    var ParentClass = Object.getPrototypeOf(Component);
    var WrappedComponent = (0, _componentWithName2.default)(Component.name, ParentClass);

    var additionalPropTypes = mapObjectValuesToValue(propsToClassMap, _react.PropTypes.bool);

    WrappedComponent.propTypes = _extends({}, Component.propTypes, {
      className: _react.PropTypes.string
    }, additionalPropTypes);

    WrappedComponent.prototype.render = function render() {
      var className = this.props.className;

      var rest = getRemainingProps(this.props, Object.keys(propsToClassMap));

      return _react2.default.createElement(Component, _extends({
        className: getClassNamesFromProps(this.props, propsToClassMap, className)
      }, rest));
    };

    return WrappedComponent;
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentWithName = undefined;

var _wrapComponent = __webpack_require__(1);

var _wrapComponent2 = _interopRequireDefault(_wrapComponent);

var _componentWithName = __webpack_require__(0);

var _componentWithName2 = _interopRequireDefault(_componentWithName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _wrapComponent2.default;
exports.componentWithName = _componentWithName2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});