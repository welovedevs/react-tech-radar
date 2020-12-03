"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(props) {
  return /*#__PURE__*/_react.default.createElement("line", {
    x1: "0",
    y1: "0",
    x2: props.x2,
    y2: props.y2,
    stroke: props.stroke
  });
}

Line.propTypes = {
  x2: _propTypes.default.number.isRequired,
  y2: _propTypes.default.number.isRequired,
  stroke: _propTypes.default.string.isRequired
};
var _default = Line;
exports.default = _default;