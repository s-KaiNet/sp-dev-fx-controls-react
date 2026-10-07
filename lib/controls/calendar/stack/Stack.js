import { __assign } from "tslib";
import { mergeClasses, tokens } from '@fluentui/react-components';
import React from 'react';
import { css } from '@emotion/css';
var sizeMap = {
    xs: tokens.spacingHorizontalXS,
    s: tokens.spacingHorizontalS,
    m: tokens.spacingHorizontalM,
    l: tokens.spacingHorizontalL,
    xl: tokens.spacingHorizontalXL,
    xxl: tokens.spacingHorizontalXXL,
};
export var Stack = React.memo(React.forwardRef(function (_a, ref) {
    var _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b, _c = _a.justifyContent, justifyContent = _c === void 0 ? 'flex-start' : _c, _d = _a.alignItems, alignItems = _d === void 0 ? 'stretch' : _d, gap = _a.gap, columnGap = _a.columnGap, rowGap = _a.rowGap, margin = _a.margin, padding = _a.padding, marginTop = _a.marginTop, marginBottom = _a.marginBottom, marginLeft = _a.marginLeft, marginRight = _a.marginRight, paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom, paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight, width = _a.width, height = _a.height, _e = _a.wrap, wrap = _e === void 0 ? false : _e, children = _a.children, style = _a.style, className = _a.className, overflow = _a.overflow, background = _a.background, id = _a.id, role = _a.role, ariaLabel = _a["aria-label"], ariaHidden = _a["aria-hidden"], onClick = _a.onClick, onKeyDown = _a.onKeyDown, tabIndex = _a.tabIndex;
    var stackStyle = css(__assign({ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', justifyContent: justifyContent, alignItems: alignItems, gap: gap && sizeMap[gap] ? sizeMap[gap] : gap, columnGap: columnGap && sizeMap[columnGap] ? sizeMap[columnGap] : columnGap, rowGap: rowGap && sizeMap[rowGap] ? sizeMap[rowGap] : rowGap, margin: margin && sizeMap[margin] ? sizeMap[margin] : margin, padding: padding && sizeMap[padding] ? sizeMap[padding] : padding, marginTop: marginTop && sizeMap[marginTop] ? sizeMap[marginTop] : marginTop, marginBottom: marginBottom && sizeMap[marginBottom]
            ? sizeMap[marginBottom]
            : marginBottom, marginLeft: marginLeft && sizeMap[marginLeft] ? sizeMap[marginLeft] : marginLeft, marginRight: marginRight && sizeMap[marginRight]
            ? sizeMap[marginRight]
            : marginRight, paddingTop: paddingTop && sizeMap[paddingTop] ? sizeMap[paddingTop] : paddingTop, paddingBottom: paddingBottom && sizeMap[paddingBottom]
            ? sizeMap[paddingBottom]
            : paddingBottom, paddingLeft: paddingLeft && sizeMap[paddingLeft]
            ? sizeMap[paddingLeft]
            : paddingLeft, paddingRight: paddingRight && sizeMap[paddingRight]
            ? sizeMap[paddingRight]
            : paddingRight, width: width, height: height, overflow: overflow, flexWrap: wrap ? 'wrap' : 'nowrap', backgroundColor: background }, style));
    return (React.createElement("div", { ref: ref, id: id, role: role, "aria-label": ariaLabel, "aria-hidden": ariaHidden, onClick: onClick, onKeyDown: onKeyDown, tabIndex: tabIndex, className: mergeClasses(className, stackStyle) }, children));
}));
export default Stack;
//# sourceMappingURL=Stack.js.map