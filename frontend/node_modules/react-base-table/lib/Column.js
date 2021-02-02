"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FrozenDirection = exports.Alignment = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Alignment = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
};
exports.Alignment = Alignment;
var FrozenDirection = {
  LEFT: 'left',
  RIGHT: 'right',
  DEFAULT: true,
  NONE: false
};
/**
 * Column for BaseTable
 */

exports.FrozenDirection = FrozenDirection;

var Column =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Column, _React$Component);

  function Column() {
    (0, _classCallCheck2["default"])(this, Column);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Column).apply(this, arguments));
  }

  return Column;
}(_react["default"].Component);

Column.propTypes = {
  /**
   * Class name for the column cell, could be a callback to return the class name
   * The callback is of the shape of `({ cellData, columns, column, columnIndex, rowData, rowIndex }) => string`
   */
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),

  /**
   * Class name for the column header, could be a callback to return the class name
   * The callback is of the shape of `({ columns, column, columnIndex, headerIndex }) => string`
   */
  headerClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),

  /**
   * Custom style for the column cell, including the header cells
   */
  style: _propTypes["default"].object,

  /**
   * Title for the column header
   */
  title: _propTypes["default"].string,

  /**
   * Data key for the column cell, could be "a.b.c"
   */
  dataKey: _propTypes["default"].string,

  /**
   * Custom cell data getter
   * The handler is of the shape of `({ columns, column, columnIndex, rowData, rowIndex }) => node`
   */
  dataGetter: _propTypes["default"].func,

  /**
   * Alignment of the column cell
   */
  align: _propTypes["default"].oneOf(['left', 'center', 'right']),

  /**
   * Flex grow style, defaults to 0
   */
  flexGrow: _propTypes["default"].number,

  /**
   * Flex shrink style, defaults to 1 for flexible table and 0 for fixed table
   */
  flexShrink: _propTypes["default"].number,

  /**
   * The width of the column, gutter width is not included
   */
  width: _propTypes["default"].number.isRequired,

  /**
   * Maximum width of the column, used if the column is resizable
   */
  maxWidth: _propTypes["default"].number,

  /**
   * Minimum width of the column, used if the column is resizable
   */
  minWidth: _propTypes["default"].number,

  /**
   * Whether the column is frozen and what's the frozen side
   */
  frozen: _propTypes["default"].oneOf(['left', 'right', true, false]),

  /**
   * Whether the column is hidden
   */
  hidden: _propTypes["default"].bool,

  /**
   * Whether the column is resizable, defaults to true
   */
  resizable: _propTypes["default"].bool,

  /**
   * Whether the column is sortable, defaults to true
   */
  sortable: _propTypes["default"].bool,

  /**
   * Custom column cell renderer
   * The renderer receives props `{ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }`
   */
  cellRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Custom column header renderer
   * The renderer receives props `{ columns, column, columnIndex, headerIndex, container }`
   */
  headerRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element])
};
Column.Alignment = Alignment;
Column.FrozenDirection = FrozenDirection;
var _default = Column;
exports["default"] = _default;
//# sourceMappingURL=Column.js.map