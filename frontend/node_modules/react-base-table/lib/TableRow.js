"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

/**
 * Row component for BaseTable
 */
var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(TableRow, _React$PureComponent);

  function TableRow(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TableRow);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TableRow).call(this, props));
    _this._handleExpand = _this._handleExpand.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(TableRow, [{
    key: "render",
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _this$props = this.props,
          isScrolling = _this$props.isScrolling,
          className = _this$props.className,
          style = _this$props.style,
          columns = _this$props.columns,
          rowIndex = _this$props.rowIndex,
          rowData = _this$props.rowData,
          expandColumnKey = _this$props.expandColumnKey,
          depth = _this$props.depth,
          rowEventHandlers = _this$props.rowEventHandlers,
          rowRenderer = _this$props.rowRenderer,
          cellRenderer = _this$props.cellRenderer,
          expandIconRenderer = _this$props.expandIconRenderer,
          Tag = _this$props.tagName,
          rowKey = _this$props.rowKey,
          onRowHover = _this$props.onRowHover,
          onRowExpand = _this$props.onRowExpand,
          rest = (0, _objectWithoutProperties2["default"])(_this$props, ["isScrolling", "className", "style", "columns", "rowIndex", "rowData", "expandColumnKey", "depth", "rowEventHandlers", "rowRenderer", "cellRenderer", "expandIconRenderer", "tagName", "rowKey", "onRowHover", "onRowExpand"]);
      /* eslint-enable no-unused-vars */

      var expandIcon = expandIconRenderer({
        rowData: rowData,
        rowIndex: rowIndex,
        depth: depth,
        onExpand: this._handleExpand
      });
      var cells = columns.map(function (column, columnIndex) {
        return cellRenderer({
          isScrolling: isScrolling,
          columns: columns,
          column: column,
          columnIndex: columnIndex,
          rowData: rowData,
          rowIndex: rowIndex,
          expandIcon: column.key === expandColumnKey && expandIcon
        });
      });

      if (rowRenderer) {
        cells = (0, _utils.renderElement)(rowRenderer, {
          isScrolling: isScrolling,
          cells: cells,
          columns: columns,
          rowData: rowData,
          rowIndex: rowIndex,
          depth: depth
        });
      }

      var eventHandlers = this._getEventHandlers(rowEventHandlers);

      return _react["default"].createElement(Tag, (0, _extends2["default"])({}, rest, {
        className: className,
        style: style
      }, eventHandlers), cells);
    }
  }, {
    key: "_handleExpand",
    value: function _handleExpand(expanded) {
      var _this$props2 = this.props,
          onRowExpand = _this$props2.onRowExpand,
          rowData = _this$props2.rowData,
          rowIndex = _this$props2.rowIndex,
          rowKey = _this$props2.rowKey;
      onRowExpand && onRowExpand({
        expanded: expanded,
        rowData: rowData,
        rowIndex: rowIndex,
        rowKey: rowKey
      });
    }
  }, {
    key: "_getEventHandlers",
    value: function _getEventHandlers() {
      var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props3 = this.props,
          rowData = _this$props3.rowData,
          rowIndex = _this$props3.rowIndex,
          rowKey = _this$props3.rowKey,
          onRowHover = _this$props3.onRowHover;
      var eventHandlers = {};
      Object.keys(handlers).forEach(function (eventKey) {
        var callback = handlers[eventKey];

        if (typeof callback === 'function') {
          eventHandlers[eventKey] = function (event) {
            callback({
              rowData: rowData,
              rowIndex: rowIndex,
              rowKey: rowKey,
              event: event
            });
          };
        }
      });

      if (onRowHover) {
        var mouseEnterHandler = eventHandlers['onMouseEnter'];

        eventHandlers['onMouseEnter'] = function (event) {
          onRowHover({
            hovered: true,
            rowData: rowData,
            rowIndex: rowIndex,
            rowKey: rowKey,
            event: event
          });
          mouseEnterHandler && mouseEnterHandler(event);
        };

        var mouseLeaveHandler = eventHandlers['onMouseLeave'];

        eventHandlers['onMouseLeave'] = function (event) {
          onRowHover({
            hovered: false,
            rowData: rowData,
            rowIndex: rowIndex,
            rowKey: rowKey,
            event: event
          });
          mouseLeaveHandler && mouseLeaveHandler(event);
        };
      }

      return eventHandlers;
    }
  }]);
  return TableRow;
}(_react["default"].PureComponent);

TableRow.defaultProps = {
  tagName: 'div'
};
TableRow.propTypes = {
  isScrolling: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  rowData: _propTypes["default"].object.isRequired,
  rowIndex: _propTypes["default"].number.isRequired,
  rowKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  expandColumnKey: _propTypes["default"].string,
  depth: _propTypes["default"].number,
  rowEventHandlers: _propTypes["default"].object,
  rowRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),
  cellRenderer: _propTypes["default"].func,
  expandIconRenderer: _propTypes["default"].func,
  onRowHover: _propTypes["default"].func,
  onRowExpand: _propTypes["default"].func,
  tagName: _propTypes["default"].elementType
};
var _default = TableRow;
exports["default"] = _default;
//# sourceMappingURL=TableRow.js.map