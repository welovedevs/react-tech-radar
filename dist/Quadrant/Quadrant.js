"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Text = _interopRequireDefault(require("../Text/Text"));

var _Path = _interopRequireDefault(require("../Path/Path"));

var _Line = _interopRequireDefault(require("../Line/Line"));

var _Item = _interopRequireDefault(require("../Item/Item"));

var _Quadrant = require("./Quadrant.style");

var _themeContext = require("../theme-context");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Quadrant(props) {
  //context variables
  var _useContext = (0, _react.useContext)(_themeContext.ThemeContext),
      fontSize = _useContext.fontSize,
      fontFamily = _useContext.fontFamily,
      colorScale = _useContext.colorScale,
      _useContext$quadrants = _useContext.quadrantsConfig,
      textMargin = _useContext$quadrants.textMargin,
      textYOffset = _useContext$quadrants.textYOffset,
      showOnlyFirstQuadrantLabels = _useContext$quadrants.showOnlyFirstQuadrantLabels; //optional variables


  var radiusDiminishConstant = props.radiusDiminish;

  var _ref = /*#__PURE__*/_react.default.createRef();

  var ringWidth = props.width / 2;
  var radialAngle = 2 * Math.PI / 360 * props.angle;

  var onMouseOver = function onMouseOver() {
    _ref.style.opacity = '1.0';
  };

  var onMouseOut = function onMouseOut() {
    _ref.style.opacity = '0.7';
  };

  var onMouseClick = function onMouseClick() {// const svg = d3.select(ref);
    // svg.transition()
    //     .duration(2000)
    //     .style("transform", "translate(-300px, -300px) scale(" + 2 + ") ")
  };

  var calculateRadiusDiminish = function calculateRadiusDiminish(nrOfRings) {
    var max = 1; //create the array. each value represents
    //the share of total radius among rings.

    var arr = [1];

    for (var i = 1; i < nrOfRings; i++) {
      max = max * radiusDiminishConstant;
      arr.push(max);
    } //calculate total shares of radius


    var sum = arr.reduce(function (a, b) {
      return a + b;
    });
    arr = arr.map(function (a) {
      return a / sum;
    }); //now, each member of the array represent
    //the starting position of ring in the
    //circle

    arr.reverse();

    for (var _i = 1; _i < nrOfRings; _i++) {
      arr[_i] = arr[_i - 1] + arr[_i];
    } //add 0 for the center of the circle


    arr.push(0); //sort the array so that 0 is at the start

    arr.sort();
    return arr;
  };

  var radiuses = calculateRadiusDiminish(props.rings.length);
  return /*#__PURE__*/_react.default.createElement(_Quadrant.QuadrantWrapper, {
    transform: props.transform,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onClick: onMouseClick,
    ref: function ref(el) {
      return _ref = el;
    }
  }, /*#__PURE__*/_react.default.createElement(_Line.default, {
    x2: ringWidth,
    y2: 0,
    stroke: colorScale(props.index)
  }), props.rings.map(function (ringValue, ringIndex) {
    var ringsLength = props.rings.length;
    var title = ringIndex === props.rings.length - 1 ? props.name : null;
    var leftMargin = textMargin !== null && textMargin !== void 0 ? textMargin : 40 * (radiuses[ringIndex + 1] - radiuses[ringIndex]);
    var showLabel = showOnlyFirstQuadrantLabels ? props.index === 0 : true;
    return /*#__PURE__*/_react.default.createElement("g", {
      key: props.index + "-" + ringIndex
    }, showLabel && /*#__PURE__*/_react.default.createElement(_Text.default, {
      name: ringValue,
      dx: leftMargin + radiuses[ringIndex] * ringWidth,
      dy: textYOffset,
      fontSize: fontSize,
      fontFamily: fontFamily
    }), /*#__PURE__*/_react.default.createElement(_Path.default, {
      quadIndex: props.index,
      ringIndex: ringIndex,
      ringWidth: ringWidth,
      ringsLength: ringsLength,
      quad_angle: radialAngle,
      outerRadius: radiuses[ringIndex + 1],
      innerRadius: radiuses[ringIndex],
      title: title
    }));
  }), props.points.map(function (value, index) {
    return /*#__PURE__*/_react.default.createElement(_Item.default, {
      rotateDegrees: -props.rotateDegrees,
      key: index,
      data: value
    });
  }));
}

Quadrant.propTypes = {
  transform: _propTypes.default.string.isRequired,
  rotateDegrees: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  index: _propTypes.default.number.isRequired,
  rings: _propTypes.default.array.isRequired,
  points: _propTypes.default.array.isRequired,
  angle: _propTypes.default.number.isRequired,
  name: _propTypes.default.string.isRequired,
  radiusDiminish: _propTypes.default.number
};
var _default = Quadrant;
exports.default = _default;