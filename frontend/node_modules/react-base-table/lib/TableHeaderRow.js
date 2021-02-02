"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

/**
 * HeaderRow component for BaseTable
 */
var TableHeaderRow = function TableHeaderRow(_ref) {
  var className = _ref.className,
      style = _ref.style,
      columns = _ref.columns,
      headerIndex = _ref.headerIndex,
      cellRenderer = _ref.cellRenderer,
      headerRenderer = _ref.headerRenderer,
      expandColumnKey = _ref.expandColumnKey,
      ExpandIcon = _ref.expandIcon,
      Tag = _ref.tagName,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["className", "style", "columns", "headerIndex", "cellRenderer", "headerRenderer", "expandColumnKey", "expandIcon", "tagName"]);
  var cells = columns.map(function (column, columnIndex) {
    return cellRenderer({
      columns: columns,
      column: column,
      columnIndex: columnIndex,
      headerIndex: headerIndex,
      expandIcon: column.key === expandColumnKey && _react["default"].createElement(ExpandIcon, null)
    });
  });

  if (headerRenderer) {
    cells = (0, _utils.renderElement)(headerRenderer, {
      cells: cells,
      columns: columns,
      headerIndex: headerIndex
    });
  }

  return _react["default"].createElement(Tag, (0, _extends2["default"])({}, rest, {
    className: className,
    style: style
  }), cells);
};

TableHeaderRow.defaultProps = {
  tagName: 'div'
};
TableHeaderRow.propTypes = {
  isScrolling: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  headerIndex: _propTypes["default"].number,
  cellRenderer: _propTypes["default"].func,
  headerRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),
  expandColumnKey: _propTypes["default"].string,
  expandIcon: _propTypes["default"].func,
  tagName: _propTypes["default"].elementType
};
var _default = TableHeaderRow;
exports["default"] = _default;
//# sourceMappingURL=TableHeaderRow.js.map