"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Radar = require("./Radar.style");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Quadrant = _interopRequireDefault(require("../Quadrant/Quadrant"));

var _themeContext = require("../theme-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//when point coordinates are calculated randomly, sometimes point coordinates
// get so close that it would be hard to read the textual part. When such
//collisions occur, the position generator retries. This constant defines the
//number of trials where it has to stop.
var MAX_COLLISION_RETRY_COUNT = 350; //This value is used to determine whether a collision retry should be triggered or not.

var TOLERANCE_CONSTANT = 6; //default radar width

var DEFAULT_WIDTH = 700; //radius of rings diminish as they move away from the center

var RADIUS_DIMINISH_CONSTANT = 1.5; //extend width to right so that overflow text would be visible

var RIGHT_EXTENSION = 1.1;

function Radar(props) {
  //manage optional variables
  var width = props.width || DEFAULT_WIDTH;
  var rings = props.rings || [""];
  var radiusDiminishConstant = props.radiusDiminish || RADIUS_DIMINISH_CONSTANT;
  var data = props.data || [];

  if (data.length === 0) {
    console.log("No Data Provided");
  } //context variables


  var _useContext = (0, _react.useContext)(_themeContext.ThemeContext),
      fontSize = _useContext.fontSize,
      fontFamily = _useContext.fontFamily,
      colorScale = _useContext.colorScale; //margin of radar


  var margin = props.margin || 5; //some internally used constants

  var angle = 360 / props.quadrants.length; //collision detection constants

  var toleranceX = width / rings.length / 100 * TOLERANCE_CONSTANT * 4;
  var toleranceY = props.fontSize || fontSize; //console.log("Collision Tolerance (Pixels):");
  //console.log("x: " + toleranceX);
  //console.log("y: " + toleranceY);
  //given the ring and quadrant of a value,
  //calculates x and y coordinates

  var processRadarData = function processRadarData(quadrants, rings, data) {
    //order by rings. this will result in better collision
    //detection performance since it is harder to relocate
    // the points in the core ring
    data.sort(function (a, b) {
      return rings.indexOf(a.ring) - rings.indexOf(b.ring);
    });
    var collisionCount = 0; // go through the data

    var results = [];

    for (var i in data) {
      var entry = data[i];
      var quadrant_delta = 0; // figure out which quadrant this is

      var _angle = 2 * Math.PI / props.quadrants.length;

      for (var j = 0, len = quadrants.length; j < len; j++) {
        if (quadrants[j] === entry.quadrant) {
          quadrant_delta = _angle * j;
        }
      }

      var coordinates = getRandomCoordinates(rings, entry, _angle, quadrant_delta, results, collisionCount);

      if (collisionCount < MAX_COLLISION_RETRY_COUNT) {
        collisionCount = coordinates.collisionCount;
      }

      var blip = {
        id: i,
        name: entry.name,
        quadrant: entry.quadrant,
        x: coordinates.x,
        y: coordinates.y
      };
      results.push(blip);
    } //console.log("Collision Count: " + collisionCount);


    return results;
  }; //used by processRadarData.
  //generates random coordinates within given range


  var getRandomCoordinates = function getRandomCoordinates(rings, entry, angle, quadrant_delta, results) {
    var collisionCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    var polarToCartesian = function polarToCartesian(r, t) {
      var x = r * Math.cos(t);
      var y = r * Math.sin(t);
      return {
        x: x,
        y: y
      };
    };

    var getPositionByQuadrant = function getPositionByQuadrant(radiusArray) {
      var ringCount = rings.length;
      var margin = 0.2;
      var ringIndex = rings.indexOf(entry.ring);
      var posStart = radiusArray[ringIndex] + 1 / ringCount * margin;
      var posLength = Math.random() * (radiusArray[ringIndex + 1] - radiusArray[ringIndex] - 2 * (1 / ringCount * margin));
      return posStart + posLength;
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

    var hasCollision = function hasCollision(results, coordinates) {
      if (collisionCount >= MAX_COLLISION_RETRY_COUNT) {
        return false;
      }

      var _iterator = _createForOfIteratorHelper(results),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var result = _step.value;

          if (Math.abs(result.x - coordinates.x) <= toleranceX && Math.abs(result.y - coordinates.y) <= toleranceY) {
            if (++collisionCount >= MAX_COLLISION_RETRY_COUNT) {
              console.log("max collision retry limit reached: " + collisionCount);
            }

            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    };

    var radiusArray = calculateRadiusDiminish(props.rings.length);
    var randomPosition = getPositionByQuadrant(radiusArray);
    var positionAngle = Math.random();
    var ringWidth = width / 2; //theta is the position in the quadrant

    var theta = positionAngle * angle + quadrant_delta;
    var r = randomPosition * ringWidth;
    var data = polarToCartesian(r, theta); //recalculate if there is a collision

    var collision = hasCollision(results, data);

    if (collision) {
      return getRandomCoordinates(rings, entry, angle, quadrant_delta, results, collisionCount);
    } //report number of collisions detected


    data.collisionCount = collisionCount;
    return data;
  };

  var points = processRadarData(props.quadrants, rings, data);
  return (
    /*#__PURE__*/
    //theme context variables can be overridden by props
    _react.default.createElement(_themeContext.ThemeContext.Provider, {
      value: {
        fontSize: props.fontSize || fontSize,
        itemFontSize: props.itemFontSize || props.fontSize || fontSize,
        fontFamily: props.fontFamily || fontFamily,
        colorScale: props.colorScaleIndex ? (0, _themeContext.getColorScale)(props.colorScaleIndex) : colorScale,
        quadrantsConfig: props.quadrantsConfig || {}
      }
    }, /*#__PURE__*/_react.default.createElement(_Radar.RadarContents, {
      width: width * RIGHT_EXTENSION,
      height: width,
      style: {
        margin: margin
      }
    }, /*#__PURE__*/_react.default.createElement("g", {
      transform: "translate(" + width / 2 + "," + width / 2 + ")"
    }, props.quadrants.map(function (value, index) {
      //get points that belong to this quadrant
      var filteredPoints = points.filter(function (element) {
        return element.quadrant === value;
      });
      return /*#__PURE__*/_react.default.createElement("g", {
        key: index
      }, /*#__PURE__*/_react.default.createElement(_Quadrant.default, {
        transform: " rotate(" + 360 / props.quadrants.length * index + ") translate(" + margin + "," + margin + ")  ",
        rotateDegrees: 360 / props.quadrants.length * index,
        width: width - 2 * margin,
        index: index,
        rings: rings,
        points: filteredPoints,
        angle: angle,
        name: value,
        radiusDiminish: radiusDiminishConstant
      }));
    }))))
  );
}

Radar.propTypes = {
  quadrants: _propTypes.default.array.isRequired,
  rings: _propTypes.default.array,
  data: _propTypes.default.array,
  width: _propTypes.default.number,
  fontSize: _propTypes.default.number,
  itemFontSize: _propTypes.default.number,
  colorScaleIndex: _propTypes.default.number,
  radiusDiminish: _propTypes.default.number
};
var _default = Radar;
exports.default = _default;