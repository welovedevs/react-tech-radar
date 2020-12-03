"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _d3Color = require("d3-color");

var _d3Shape = require("d3-shape");

var _themeContext = require("../theme-context");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Path(props) {
  //context variables
  var _useContext = (0, _react.useContext)(_themeContext.ThemeContext),
      fontSize = _useContext.fontSize,
      fontFamily = _useContext.fontFamily,
      colorScale = _useContext.colorScale;

  var rgb = (0, _d3Color.rgb)(colorScale(props.quadIndex));
  var fill = rgb.brighter(props.ringIndex / props.ringsLength * 0.9);
  var uniquePathId = props.quadIndex + "-" + props.ringIndex;

  var archFunction = function archFunction() {
    return (0, _d3Shape.arc)().outerRadius(function () {
      return props.outerRadius * props.ringWidth;
    }).innerRadius(function () {
      return props.innerRadius * props.ringWidth;
    }).startAngle(function () {
      return Math.PI / 2;
    }).endAngle(function () {
      return props.quad_angle + Math.PI / 2;
    });
  };

  return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    id: uniquePathId,
    className: "quadrant",
    d: archFunction()(),
    fill: fill
  }), props.title && /*#__PURE__*/_react.default.createElement("text", {
    dx: props.ringWidth / 2,
    fontSize: fontSize,
    fontFamily: fontFamily
  }, /*#__PURE__*/_react.default.createElement("textPath", {
    href: '#' + uniquePathId
  }, props.title)));
}

Path.propTypes = {
  quadIndex: _propTypes.default.number.isRequired,
  ringIndex: _propTypes.default.number.isRequired,
  ringWidth: _propTypes.default.number.isRequired,
  ringsLength: _propTypes.default.number.isRequired,
  quad_angle: _propTypes.default.number.isRequired,
  outerRadius: _propTypes.default.number.isRequired,
  innerRadius: _propTypes.default.number.isRequired,
  title: _propTypes.default.string
};
var _default = Path;
exports.default = _default;