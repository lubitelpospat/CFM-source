import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { renderElement } from './utils';
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
      rest = _objectWithoutPropertiesLoose(_ref, ["className", "style", "columns", "headerIndex", "cellRenderer", "headerRenderer", "expandColumnKey", "expandIcon", "tagName"]);

  var cells = columns.map(function (column, columnIndex) {
    return cellRenderer({
      columns: columns,
      column: column,
      columnIndex: columnIndex,
      headerIndex: headerIndex,
      expandIcon: column.key === expandColumnKey && React.createElement(ExpandIcon, null)
    });
  });

  if (headerRenderer) {
    cells = renderElement(headerRenderer, {
      cells: cells,
      columns: columns,
      headerIndex: headerIndex
    });
  }

  return React.createElement(Tag, _extends({}, rest, {
    className: className,
    style: style
  }), cells);
};

TableHeaderRow.defaultProps = {
  tagName: 'div'
};
TableHeaderRow.propTypes = {
  isScrolling: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerIndex: PropTypes.number,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  expandColumnKey: PropTypes.string,
  expandIcon: PropTypes.func,
  tagName: PropTypes.elementType
};
export default TableHeaderRow;
//# sourceMappingURL=TableHeaderRow.js.map