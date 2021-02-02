"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var INVALID_VALUE = null; // copied from https://github.com/mzabriskie/react-draggable/blob/master/lib/utils/domFns.js

function addUserSelectStyles(doc) {
  if (!doc) return;
  var styleEl = doc.getElementById('react-draggable-style-el');

  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {background: transparent;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }

  if (doc.body) (0, _utils.addClassName)(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc) {
  try {
    if (doc && doc.body) (0, _utils.removeClassName)(doc.body, 'react-draggable-transparent-selection');

    if (doc.selection) {
      doc.selection.empty();
    } else {
      window.getSelection().removeAllRanges(); // remove selection caused by scroll
    }
  } catch (e) {// probably IE
  }
}

var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};
var dragEventFor = eventsFor.mouse;
/**
 * ColumnResizer for BaseTable
 */

var ColumnResizer =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(ColumnResizer, _React$PureComponent);

  function ColumnResizer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ColumnResizer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ColumnResizer).call(this, props));
    _this.isDragging = false;
    _this.lastX = INVALID_VALUE;
    _this.width = 0;
    _this._setHandleRef = _this._setHandleRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleClick = _this._handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleMouseDown = _this._handleMouseDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleMouseUp = _this._handleMouseUp.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleTouchStart = _this._handleTouchStart.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleTouchEnd = _this._handleTouchEnd.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleDragStart = _this._handleDragStart.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleDragStop = _this._handleDragStop.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleDrag = _this._handleDrag.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ColumnResizer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.handleRef) {
        var ownerDocument = this.handleRef.ownerDocument;
        ownerDocument.removeEventListener(eventsFor.mouse.move, this._handleDrag);
        ownerDocument.removeEventListener(eventsFor.mouse.stop, this._handleDragStop);
        ownerDocument.removeEventListener(eventsFor.touch.move, this._handleDrag);
        ownerDocument.removeEventListener(eventsFor.touch.stop, this._handleDragStop);
        removeUserSelectStyles(ownerDocument);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          column = _this$props.column,
          onResizeStart = _this$props.onResizeStart,
          onResize = _this$props.onResize,
          onResizeStop = _this$props.onResizeStop,
          minWidth = _this$props.minWidth,
          rest = (0, _objectWithoutProperties2["default"])(_this$props, ["style", "column", "onResizeStart", "onResize", "onResizeStop", "minWidth"]);
      return _react["default"].createElement("div", (0, _extends2["default"])({}, rest, {
        ref: this._setHandleRef,
        onClick: this._handleClick,
        onMouseDown: this._handleMouseDown,
        onMouseUp: this._handleMouseUp,
        onTouchStart: this._handleTouchStart,
        onTouchEnd: this._handleTouchEnd,
        style: _objectSpread({
          userSelect: 'none',
          touchAction: 'none',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          cursor: 'col-resize'
        }, style)
      }));
    }
  }, {
    key: "_setHandleRef",
    value: function _setHandleRef(ref) {
      this.handleRef = ref;
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      e.stopPropagation();
    }
  }, {
    key: "_handleMouseDown",
    value: function _handleMouseDown(e) {
      dragEventFor = eventsFor.mouse;

      this._handleDragStart(e);
    }
  }, {
    key: "_handleMouseUp",
    value: function _handleMouseUp(e) {
      dragEventFor = eventsFor.mouse;

      this._handleDragStop(e);
    }
  }, {
    key: "_handleTouchStart",
    value: function _handleTouchStart(e) {
      dragEventFor = eventsFor.touch;

      this._handleDragStart(e);
    }
  }, {
    key: "_handleTouchEnd",
    value: function _handleTouchEnd(e) {
      dragEventFor = eventsFor.touch;

      this._handleDragStop(e);
    }
  }, {
    key: "_handleDragStart",
    value: function _handleDragStart(e) {
      if (typeof e.button === 'number' && e.button !== 0) return;
      this.isDragging = true;
      this.lastX = INVALID_VALUE;
      this.width = this.props.column.width;
      this.props.onResizeStart(this.props.column);
      var ownerDocument = this.handleRef.ownerDocument;
      addUserSelectStyles(ownerDocument);
      ownerDocument.addEventListener(dragEventFor.move, this._handleDrag);
      ownerDocument.addEventListener(dragEventFor.stop, this._handleDragStop);
    }
  }, {
    key: "_handleDragStop",
    value: function _handleDragStop(e) {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.props.onResizeStop(this.props.column);
      var ownerDocument = this.handleRef.ownerDocument;
      removeUserSelectStyles(ownerDocument);
      ownerDocument.removeEventListener(dragEventFor.move, this._handleDrag);
      ownerDocument.removeEventListener(dragEventFor.stop, this._handleDragStop);
    }
  }, {
    key: "_handleDrag",
    value: function _handleDrag(e) {
      var clientX = e.clientX;

      if (e.type === eventsFor.touch.move) {
        e.preventDefault();
        if (e.targetTouches && e.targetTouches[0]) clientX = e.targetTouches[0].clientX;
      }

      var offsetParent = this.handleRef.offsetParent;
      var offsetParentRect = offsetParent.getBoundingClientRect();
      var x = clientX + offsetParent.scrollLeft - offsetParentRect.left;

      if (this.lastX === INVALID_VALUE) {
        this.lastX = x;
        return;
      }

      var _this$props2 = this.props,
          column = _this$props2.column,
          MIN_WIDTH = _this$props2.minWidth;
      var width = column.width,
          maxWidth = column.maxWidth,
          _column$minWidth = column.minWidth,
          minWidth = _column$minWidth === void 0 ? MIN_WIDTH : _column$minWidth;
      var movedX = x - this.lastX;
      if (!movedX) return;
      this.width = this.width + movedX;
      this.lastX = x;
      var newWidth = this.width;

      if (maxWidth && newWidth > maxWidth) {
        newWidth = maxWidth;
      } else if (newWidth < minWidth) {
        newWidth = minWidth;
      }

      if (newWidth === width) return;
      this.props.onResize(column, newWidth);
    }
  }]);
  return ColumnResizer;
}(_react["default"].PureComponent);

ColumnResizer.defaultProps = {
  onResizeStart: _utils.noop,
  onResize: _utils.noop,
  onResizeStop: _utils.noop,
  minWidth: 30
};
ColumnResizer.propTypes = {
  /**
   * Custom style for the drag handler
   */
  style: _propTypes["default"].object,

  /**
   * The column object to be dragged
   */
  column: _propTypes["default"].object,

  /**
   * A callback function when resizing started
   * The callback is of the shape of `(column) => *`
   */
  onResizeStart: _propTypes["default"].func,

  /**
   * A callback function when resizing the column
   * The callback is of the shape of `(column, width) => *`
   */
  onResize: _propTypes["default"].func,

  /**
   * A callback function when resizing stopped
   * The callback is of the shape of `(column) => *`
   */
  onResizeStop: _propTypes["default"].func,

  /**
   * Minimum width of the column could be resized to if the column's `minWidth` is not set
   */
  minWidth: _propTypes["default"].number
};
var _default = ColumnResizer;
exports["default"] = _default;
//# sourceMappingURL=ColumnResizer.js.map