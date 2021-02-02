import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { renderElement } from './utils';
/**
 * Row component for BaseTable
 */

var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(TableRow, _React$PureComponent);

  function TableRow(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this._handleExpand = _this._handleExpand.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = TableRow.prototype;

  _proto.render = function render() {
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
        rest = _objectWithoutPropertiesLoose(_this$props, ["isScrolling", "className", "style", "columns", "rowIndex", "rowData", "expandColumnKey", "depth", "rowEventHandlers", "rowRenderer", "cellRenderer", "expandIconRenderer", "tagName", "rowKey", "onRowHover", "onRowExpand"]);
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
      cells = renderElement(rowRenderer, {
        isScrolling: isScrolling,
        cells: cells,
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex,
        depth: depth
      });
    }

    var eventHandlers = this._getEventHandlers(rowEventHandlers);

    return React.createElement(Tag, _extends({}, rest, {
      className: className,
      style: style
    }, eventHandlers), cells);
  };

  _proto._handleExpand = function _handleExpand(expanded) {
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
  };

  _proto._getEventHandlers = function _getEventHandlers(handlers) {
    if (handlers === void 0) {
      handlers = {};
    }

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
  };

  return TableRow;
}(React.PureComponent);

TableRow.defaultProps = {
  tagName: 'div'
};
TableRow.propTypes = {
  isScrolling: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expandColumnKey: PropTypes.string,
  depth: PropTypes.number,
  rowEventHandlers: PropTypes.object,
  rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  cellRenderer: PropTypes.func,
  expandIconRenderer: PropTypes.func,
  onRowHover: PropTypes.func,
  onRowExpand: PropTypes.func,
  tagName: PropTypes.elementType
};
export default TableRow;
//# sourceMappingURL=TableRow.js.map