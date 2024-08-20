var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import styles from './GridLayout.module.scss';
// Used to render list grid
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import * as telemetry from '../../common/telemetry';
// Get the constants from the SCSS so that we don't hard-code look and feel elements
var ROWS_PER_PAGE = +styles.rowsPerPage;
var MAX_ROW_HEIGHT = +styles.maxWidth;
var PADDING = +styles.padding;
var MIN_WIDTH = +styles.minWidth;
var COMPACT_THRESHOLD = +styles.compactThreshold;
/**
 * Grid layout component
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    /**
    * Constructor method
    */
    function GridLayout(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Calculates how many items in the page
         */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._isCompact = surfaceRect.width < COMPACT_THRESHOLD;
                if (_this._isCompact) {
                    _this._columnCount = 1;
                    _this._columnWidth = surfaceRect.width;
                }
                else {
                    _this._columnCount = Math.ceil(surfaceRect.width / (MAX_ROW_HEIGHT));
                    _this._columnWidth = Math.max(MIN_WIDTH, Math.floor(surfaceRect.width / _this._columnCount) + Math.floor(PADDING / _this._columnCount));
                    _this._rowHeight = _this._columnWidth;
                }
            }
            return _this._columnCount * ROWS_PER_PAGE;
        };
        /**
         * Calculates the page height for the grid
         */
        _this._getPageHeight = function () {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        /**
         * Calls the passed onRenderCell
         */
        _this._onRenderCell = function (item, index) {
            var isCompact = _this._isCompact;
            var cellPadding = index % _this._columnCount !== _this._columnCount - 1 && !isCompact ? PADDING : 0;
            var finalSize = { width: _this._columnWidth, height: _this._rowHeight };
            var cellWidth = isCompact ? _this._columnWidth + PADDING : _this._columnWidth - PADDING;
            return (React.createElement("div", { style: {
                    width: "".concat(cellWidth, "px"),
                    marginRight: "".concat(cellPadding, "px")
                } }, _this.props.onRenderGridItem(item, finalSize, isCompact)));
        };
        telemetry.track('ReactGridLayout');
        return _this;
    }
    /**
     * Renders the grid control
     */
    GridLayout.prototype.render = function () {
        return (React.createElement("div", { className: styles.gridLayout, role: "group", "aria-label": this.props.ariaLabel },
            React.createElement(FocusZone, null,
                React.createElement(List, __assign({ role: "presentation", className: styles.gridLayoutList, items: this.props.items, getItemCountForPage: this._getItemCountForPage, getPageHeight: this._getPageHeight, onRenderCell: this._onRenderCell }, this.props.listProps)))));
    };
    return GridLayout;
}(React.Component));
export { GridLayout };
//# sourceMappingURL=GridLayout.js.map