import { __assign } from "tslib";
import { mergeClasses, tokens } from "@fluentui/react-components";
import React from "react";
import { css } from "@emotion/css";
/**
 * Mapping of predefined sizes to Fluent UI tokens.
 */
var sizeMap = {
    xs: tokens.spacingHorizontalXS,
    s: tokens.spacingHorizontalS,
    m: tokens.spacingHorizontalM,
    l: tokens.spacingHorizontalL,
    xl: tokens.spacingHorizontalXL,
    xxl: tokens.spacingHorizontalXXL,
};
/**
 * Stack component provides a flexible layout using Flexbox.
 * It allows stacking child components either horizontally or vertically with predefined spacing options.
 */
export var Stack = React.memo(function (_a) {
    var _b = _a.direction, direction = _b === void 0 ? "vertical" : _b, _c = _a.justifyContent, justifyContent = _c === void 0 ? "flex-start" : _c, _d = _a.alignItems, alignItems = _d === void 0 ? "stretch" : _d, gap = _a.gap, columnGap = _a.columnGap, rowGap = _a.rowGap, margin = _a.margin, padding = _a.padding, marginTop = _a.marginTop, marginBottom = _a.marginBottom, marginLeft = _a.marginLeft, marginRight = _a.marginRight, paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom, paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight, width = _a.width, height = _a.height, _e = _a.wrap, wrap = _e === void 0 ? false : _e, children = _a.children, style = _a.style, className = _a.className, overflow = _a.overflow, background = _a.background;
    var stackStyle = css(__assign({ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", justifyContent: justifyContent, alignItems: alignItems, gap: gap && sizeMap[gap] ? sizeMap[gap] : gap, columnGap: columnGap && sizeMap[columnGap] ? sizeMap[columnGap] : columnGap, rowGap: rowGap && sizeMap[rowGap] ? sizeMap[rowGap] : rowGap, margin: margin && sizeMap[margin] ? sizeMap[margin] : margin, padding: padding && sizeMap[padding] ? sizeMap[padding] : padding, marginTop: marginTop && sizeMap[marginTop] ? sizeMap[marginTop] : marginTop, marginBottom: marginBottom && sizeMap[marginBottom]
            ? sizeMap[marginBottom]
            : marginBottom, marginLeft: marginLeft && sizeMap[marginLeft] ? sizeMap[marginLeft] : marginLeft, marginRight: marginRight && sizeMap[marginRight]
            ? sizeMap[marginRight]
            : marginRight, paddingTop: paddingTop && sizeMap[paddingTop] ? sizeMap[paddingTop] : paddingTop, paddingBottom: paddingBottom && sizeMap[paddingBottom]
            ? sizeMap[paddingBottom]
            : paddingBottom, paddingLeft: paddingLeft && sizeMap[paddingLeft]
            ? sizeMap[paddingLeft]
            : paddingLeft, paddingRight: paddingRight && sizeMap[paddingRight]
            ? sizeMap[paddingRight]
            : paddingRight, width: width, height: height, overflow: overflow, flexWrap: wrap ? "wrap" : "nowrap", backgroundColor: background }, style));
    return (React.createElement("div", { className: mergeClasses(className, stackStyle) }, children));
});
export default Stack;
//# sourceMappingURL=Stack.js.map