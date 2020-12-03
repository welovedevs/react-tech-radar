"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorScale = getColorScale;
exports.ThemeContext = exports.colorScales = void 0;

var React = _interopRequireWildcard(require("react"));

var _d3Scale = require("d3-scale");

var d3Scales = _interopRequireWildcard(require("d3-scale-chromatic"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var colorScales = [{
  "name": "schemeCategory10"
}, {
  "name": "schemeAccent"
}, {
  "name": "schemeDark2"
}, {
  "name": "schemePaired"
}, {
  "name": "schemeSet1"
}, {
  "name": "schemeSet2"
}, {
  "name": "schemeSet3"
}]; //set color scheme by index
//chose from 0 to 6

exports.colorScales = colorScales;
var DEFAULT_COLOR_SCHEME_INDEX = 5;
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_COLOR_SCALE = getColorScale(5);
var DEFAULT_FONT_FAMILY = "Arial, Helvetica, sans-serif";

function getColorScale(colorScaleIndex) {
  if (colorScaleIndex < 0 || colorScaleIndex >= colorScales.length) {
    console.warn("Unsupported color scheme. Please choose between 0 and " + (colorScales.length - 1));
    return DEFAULT_COLOR_SCHEME_INDEX;
  }

  return (0, _d3Scale.scaleOrdinal)(d3Scales[colorScales[colorScaleIndex].name]);
}

var ThemeContext = /*#__PURE__*/React.createContext({
  colorScale: DEFAULT_COLOR_SCALE,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  itemFontSize: DEFAULT_FONT_SIZE,
  quadrantsConfig: {}
});
exports.ThemeContext = ThemeContext;