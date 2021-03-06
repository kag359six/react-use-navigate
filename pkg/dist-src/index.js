"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NavigateProvider = void 0;

var _minimatch = _interopRequireDefault(require("minimatch"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NavigateContext = /*#__PURE__*/_react["default"].createContext({
  push: function push() {
    throw new Error('please provide navigation methods to NavigateProvider');
  },
  back: function back() {
    throw new Error('please provide navigation methods to NavigateProvider');
  },
  replace: function replace() {
    throw new Error('please provide navigation methods to NavigateProvider');
  }
});

var NavigateProvider = function NavigateProvider(_ref) {
  var children = _ref.children,
      methods = _objectWithoutProperties(_ref, ["children"]);

  return /*#__PURE__*/_react["default"].createElement(NavigateContext.Provider, {
    value: methods
  }, children);
};

exports.NavigateProvider = NavigateProvider;

var useNavigate = function useNavigate() {
  var methods = (0, _react.useContext)(NavigateContext);
  var navigator = (0, _react.useCallback)( // eslint-disable-next-line @typescript-eslint/ban-types
  function (method) {
    return function (_ref2) {
      var to = _ref2.to,
          _ref2$when = _ref2.when,
          when = _ref2$when === void 0 ? true : _ref2$when,
          onPaths = _ref2.onPaths,
          notOnPaths = _ref2.notOnPaths;
      var pathname = location.pathname;

      if (when) {
        if (onPaths !== undefined) {
          var match = onPaths.find(function (pattern) {
            return (0, _minimatch["default"])(pathname, pattern);
          });
          if (match) method(to);
          return;
        }

        if (notOnPaths !== undefined) {
          var _match = notOnPaths.find(function (pattern) {
            return (0, _minimatch["default"])(pathname, pattern);
          });

          if (!_match) method(to);
          return;
        }

        method(to);
      }
    };
  }, []);
  var push = (0, _react.useMemo)(function () {
    return navigator(methods.push);
  }, [methods]);
  var back = (0, _react.useMemo)(function () {
    return navigator(methods.back);
  }, [methods]);
  var replace = (0, _react.useMemo)(function () {
    return navigator(methods.replace);
  }, [methods]);
  return {
    push: push,
    back: back,
    replace: replace
  };
};

var _default = useNavigate;
exports["default"] = _default;