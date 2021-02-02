import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';

var TableHeader =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(TableHeader, _React$PureComponent);

  function TableHeader(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.renderHeaderRow = _this.renderHeaderRow.bind(_assertThisInitialized(_this));
    _this.renderFrozenRow = _this.renderFrozenRow.bind(_assertThisInitialized(_this));
    _this._setRef = _this._setRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = TableHeader.prototype;

  _proto.scrollTo = function scrollTo(offset) {
    if (this.headerRef) this.headerRef.scrollLeft = offset;
  };

  _proto.renderHeaderRow = function renderHeaderRow(height, index) {
    var _this$props = this.props,
        columns = _this$props.columns,
        headerRenderer = _this$props.headerRenderer;
    if (height <= 0) return null;
    var style = {
      width: '100%',
      height: height
    };
    return headerRenderer({
      style: style,
      columns: columns,
      headerIndex: index
    });
  };

  _proto.renderFrozenRow = function renderFrozenRow(rowData, index) {
    var _this$props2 = this.props,
        columns = _this$props2.columns,
        rowHeight = _this$props2.rowHeight,
        rowRenderer = _this$props2.rowRenderer;
    var style = {
      width: '100%',
      height: rowHeight
    }; // for frozen row the `rowIndex` is negative

    var rowIndex = -index - 1;
    return rowRenderer({
      style: style,
      columns: columns,
      rowData: rowData,
      rowIndex: rowIndex
    });
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        width = _this$props3.width,
        height = _this$props3.height,
        rowWidth = _this$props3.rowWidth,
        headerHeight = _this$props3.headerHeight,
        frozenData = _this$props3.frozenData;
    if (height <= 0) return null;
    var style = {
      width: width,
      height: height,
      position: 'relative',
      overflow: 'hidden'
    };
    var innerStyle = {
      width: rowWidth,
      height: height
    };
    var rowHeights = Array.isArray(headerHeight) ? headerHeight : [headerHeight];
    return React.createElement("div", {
      role: "grid",
      ref: this._setRef,
      className: className,
      style: style
    }, React.createElement("div", {
      role: "rowgroup",
      style: innerStyle
    }, rowHeights.map(this.renderHeaderRow), frozenData.map(this.renderFrozenRow)));
  };

  _proto._setRef = function _setRef(ref) {
    this.headerRef = ref;
  };

  return TableHeader;
}(React.PureComponent);

TableHeader.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,
  rowWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  frozenData: PropTypes.arrayOf(PropTypes.object),
  headerRenderer: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func.isRequired
};
export default TableHeader;
//# sourceMappingURL=TableHeader.js.map