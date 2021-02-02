import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
/**
 * default ExpandIcon for BaseTable
 */

var ExpandIcon =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ExpandIcon, _React$PureComponent);

  function ExpandIcon(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this._handleClick = _this._handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ExpandIcon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        expandable = _this$props.expandable,
        expanded = _this$props.expanded,
        indentSize = _this$props.indentSize,
        depth = _this$props.depth,
        onExpand = _this$props.onExpand,
        rest = _objectWithoutPropertiesLoose(_this$props, ["expandable", "expanded", "indentSize", "depth", "onExpand"]);

    if (!expandable && indentSize === 0) return null;
    var cls = cn('BaseTable__expand-icon', {
      'BaseTable__expand-icon--expanded': expanded
    });
    return React.createElement("div", _extends({}, rest, {
      className: cls,
      onClick: expandable && onExpand ? this._handleClick : null,
      style: {
        fontFamily: 'initial',
        cursor: 'pointer',
        userSelect: 'none',
        width: '16px',
        minWidth: '16px',
        height: '16px',
        lineHeight: '16px',
        fontSize: '16px',
        textAlign: 'center',
        transition: 'transform 0.15s ease-out',
        transform: "rotate(" + (expandable && expanded ? 90 : 0) + "deg)",
        marginLeft: depth * indentSize
      }
    }), expandable && "\u25B8");
  };

  _proto._handleClick = function _handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    var _this$props2 = this.props,
        onExpand = _this$props2.onExpand,
        expanded = _this$props2.expanded;
    onExpand(!expanded);
  };

  return ExpandIcon;
}(React.PureComponent);

ExpandIcon.defaultProps = {
  depth: 0,
  indentSize: 16
};
ExpandIcon.propTypes = {
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  indentSize: PropTypes.number,
  depth: PropTypes.number,
  onExpand: PropTypes.func
};
export default ExpandIcon;
//# sourceMappingURL=ExpandIcon.js.map