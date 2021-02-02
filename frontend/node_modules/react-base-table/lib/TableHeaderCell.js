"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * HeaderCell component for BaseTable
 */
var TableHeaderCell = function TableHeaderCell(_ref) {
  var className = _ref.className,
      column = _ref.column,
      columnIndex = _ref.columnIndex;
  return _react["default"].createElement("div", {
    className: className
  }, column.title);
};

TableHeaderCell.propTypes = {
  className: _propTypes["default"].string,
  column: _propTypes["default"].object,
  columnIndex: _propTypes["default"].number
};
var _default = TableHeaderCell;
exports["default"] = _default;
//# sourceMappingURL=TableHeaderCell.js.map