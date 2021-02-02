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

var _classnames = _interopRequireDefault(require("classnames"));

/**
 * default ExpandIcon for BaseTable
 */
var ExpandIcon =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(ExpandIcon, _React$PureComponent);

  function ExpandIcon(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ExpandIcon);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ExpandIcon).call(this, props));
    _this._handleClick = _this._handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ExpandIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          expandable = _this$props.expandable,
          expanded = _this$props.expanded,
          indentSize = _this$props.indentSize,
          depth = _this$props.depth,
          onExpand = _this$props.onExpand,
          rest = (0, _objectWithoutProperties2["default"])(_this$props, ["expandable", "expanded", "indentSize", "depth", "onExpand"]);
      if (!expandable && indentSize === 0) return null;
      var cls = (0, _classnames["default"])('BaseTable__expand-icon', {
        'BaseTable__expand-icon--expanded': expanded
      });
      return _react["default"].createElement("div", (0, _extends2["default"])({}, rest, {
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
          transform: "rotate(".concat(expandable && expanded ? 90 : 0, "deg)"),
          marginLeft: depth * indentSize
        }
      }), expandable && "\u25B8");
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      e.stopPropagation();
      e.preventDefault();
      var _this$props2 = this.props,
          onExpand = _this$props2.onExpand,
          expanded = _this$props2.expanded;
      onExpand(!expanded);
    }
  }]);
  return ExpandIcon;
}(_react["default"].PureComponent);

ExpandIcon.defaultProps = {
  depth: 0,
  indentSize: 16
};
ExpandIcon.propTypes = {
  expandable: _propTypes["default"].bool,
  expanded: _propTypes["default"].bool,
  indentSize: _propTypes["default"].number,
  depth: _propTypes["default"].number,
  onExpand: _propTypes["default"].func
};
var _default = ExpandIcon;
exports["default"] = _default;
//# sourceMappingURL=ExpandIcon.js.map