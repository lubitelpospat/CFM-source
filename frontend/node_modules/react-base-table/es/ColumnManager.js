import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { FrozenDirection } from './Column';

var ColumnManager =
/*#__PURE__*/
function () {
  function ColumnManager(columns, fixed) {
    this._origColumns = [];
    this.reset(columns, fixed);
  }

  var _proto = ColumnManager.prototype;

  _proto._cache = function _cache(key, fn) {
    if (key in this._cached) return this._cached[key];
    this._cached[key] = fn();
    return this._cached[key];
  };

  _proto.reset = function reset(columns, fixed) {
    var _this = this;

    this._columns = columns.map(function (column) {
      var width = column.width;

      if (column.resizable) {
        // don't reset column's `width` if `width` prop doesn't change
        var idx = _this._origColumns.findIndex(function (x) {
          return x.key === column.key;
        });

        if (idx >= 0 && _this._origColumns[idx].width === column.width) {
          width = _this._columns[idx].width;
        }
      }

      return _objectSpread({}, column, {
        width: width
      });
    });
    this._origColumns = columns;
    this._fixed = fixed;
    this._cached = {};
    this._columnStyles = this.recomputeColumnStyles();
  };

  _proto.resetCache = function resetCache() {
    this._cached = {};
  };

  _proto.getOriginalColumns = function getOriginalColumns() {
    return this._origColumns;
  };

  _proto.getColumns = function getColumns() {
    return this._columns;
  };

  _proto.getVisibleColumns = function getVisibleColumns() {
    var _this2 = this;

    return this._cache('visibleColumns', function () {
      return _this2._columns.filter(function (column) {
        return !column.hidden;
      });
    });
  };

  _proto.hasFrozenColumns = function hasFrozenColumns() {
    var _this3 = this;

    return this._cache('hasFrozenColumns', function () {
      return _this3._fixed && _this3.getVisibleColumns().some(function (column) {
        return !!column.frozen;
      });
    });
  };

  _proto.hasLeftFrozenColumns = function hasLeftFrozenColumns() {
    var _this4 = this;

    return this._cache('hasLeftFrozenColumns', function () {
      return _this4._fixed && _this4.getVisibleColumns().some(function (column) {
        return column.frozen === FrozenDirection.LEFT || column.frozen === true;
      });
    });
  };

  _proto.hasRightFrozenColumns = function hasRightFrozenColumns() {
    var _this5 = this;

    return this._cache('hasRightFrozenColumns', function () {
      return _this5._fixed && _this5.getVisibleColumns().some(function (column) {
        return column.frozen === FrozenDirection.RIGHT;
      });
    });
  };

  _proto.getMainColumns = function getMainColumns() {
    var _this6 = this;

    return this._cache('mainColumns', function () {
      var columns = _this6.getVisibleColumns();

      if (!_this6.hasFrozenColumns()) return columns;
      var mainColumns = [];

      _this6.getLeftFrozenColumns().forEach(function (column) {
        var _objectSpread2;

        //columns placeholder for the fixed table above them
        mainColumns.push(_objectSpread({}, column, (_objectSpread2 = {}, _objectSpread2[ColumnManager.PlaceholderKey] = true, _objectSpread2)));
      });

      _this6.getVisibleColumns().forEach(function (column) {
        if (!column.frozen) mainColumns.push(column);
      });

      _this6.getRightFrozenColumns().forEach(function (column) {
        var _objectSpread3;

        mainColumns.push(_objectSpread({}, column, (_objectSpread3 = {}, _objectSpread3[ColumnManager.PlaceholderKey] = true, _objectSpread3)));
      });

      return mainColumns;
    });
  };

  _proto.getLeftFrozenColumns = function getLeftFrozenColumns() {
    var _this7 = this;

    return this._cache('leftFrozenColumns', function () {
      if (!_this7._fixed) return [];
      return _this7.getVisibleColumns().filter(function (column) {
        return column.frozen === FrozenDirection.LEFT || column.frozen === true;
      });
    });
  };

  _proto.getRightFrozenColumns = function getRightFrozenColumns() {
    var _this8 = this;

    return this._cache('rightFrozenColumns', function () {
      if (!_this8._fixed) return [];
      return _this8.getVisibleColumns().filter(function (column) {
        return column.frozen === FrozenDirection.RIGHT;
      });
    });
  };

  _proto.getColumn = function getColumn(key) {
    var idx = this._columns.findIndex(function (column) {
      return column.key === key;
    });

    return this._columns[idx];
  };

  _proto.getColumnsWidth = function getColumnsWidth() {
    var _this9 = this;

    return this._cache('columnsWidth', function () {
      return _this9.recomputeColumnsWidth(_this9.getVisibleColumns());
    });
  };

  _proto.getLeftFrozenColumnsWidth = function getLeftFrozenColumnsWidth() {
    var _this10 = this;

    return this._cache('leftFrozenColumnsWidth', function () {
      return _this10.recomputeColumnsWidth(_this10.getLeftFrozenColumns());
    });
  };

  _proto.getRightFrozenColumnsWidth = function getRightFrozenColumnsWidth() {
    var _this11 = this;

    return this._cache('rightFrozenColumnsWidth', function () {
      return _this11.recomputeColumnsWidth(_this11.getRightFrozenColumns());
    });
  };

  _proto.recomputeColumnsWidth = function recomputeColumnsWidth(columns) {
    return columns.reduce(function (width, column) {
      return width + column.width;
    }, 0);
  };

  _proto.setColumnWidth = function setColumnWidth(key, width) {
    var column = this.getColumn(key);
    column.width = width;
    this._cached = {};
    this._columnStyles[column.key] = this.recomputeColumnStyle(column);
  };

  _proto.getColumnStyle = function getColumnStyle(key) {
    return this._columnStyles[key];
  };

  _proto.getColumnStyles = function getColumnStyles() {
    return this._columnStyles;
  };

  _proto.recomputeColumnStyle = function recomputeColumnStyle(column) {
    var flexGrow = 0;
    var flexShrink = 0;

    if (!this._fixed) {
      flexGrow = typeof column.flexGrow === 'number' ? column.flexGrow : 0;
      flexShrink = typeof column.flexShrink === 'number' ? column.flexShrink : 1;
    } // workaround for Flex bug on IE: https://github.com/philipwalton/flexbugs#flexbug-7


    var flexValue = flexGrow + " " + flexShrink + " auto";

    var style = _objectSpread({}, column.style, {
      flex: flexValue,
      msFlex: flexValue,
      WebkitFlex: flexValue,
      width: column.width,
      overflow: 'hidden'
    });

    if (!this._fixed && column.maxWidth) {
      style.maxWidth = column.maxWidth;
    }

    if (!this._fixed && column.minWidth) {
      style.minWidth = column.minWidth;
    }

    return style;
  };

  _proto.recomputeColumnStyles = function recomputeColumnStyles() {
    var _this12 = this;

    return this._columns.reduce(function (styles, column) {
      styles[column.key] = _this12.recomputeColumnStyle(column);
      return styles;
    }, {});
  };

  return ColumnManager;
}();

export { ColumnManager as default };
ColumnManager.PlaceholderKey = '__placeholder__';
//# sourceMappingURL=ColumnManager.js.map