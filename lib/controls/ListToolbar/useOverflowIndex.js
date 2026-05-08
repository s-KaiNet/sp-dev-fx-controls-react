import * as React from 'react';
/**
 * Minimum gap breakpoints based on the toolbar's own pixel width.
 * Wider toolbars get a larger minimum gap between regular and far items.
 */
var GAP_BREAKPOINTS = [
    { minWidth: 1280, gap: 100 },
    { minWidth: 1024, gap: 60 },
    { minWidth: 768, gap: 40 },
    { minWidth: 480, gap: 24 },
    { minWidth: 0, gap: 12 },
];
function getMinGap(toolbarWidth) {
    for (var _i = 0, GAP_BREAKPOINTS_1 = GAP_BREAKPOINTS; _i < GAP_BREAKPOINTS_1.length; _i++) {
        var bp = GAP_BREAKPOINTS_1[_i];
        if (toolbarWidth > bp.minWidth)
            return bp.gap;
    }
    return GAP_BREAKPOINTS[GAP_BREAKPOINTS.length - 1].gap;
}
/**
 * Measures how many flat-list children fit inside the available width.
 *
 * Uses three refs:
 *  - `toolbarRef`  → the outer toolbar; a ResizeObserver watches this
 *                     for width changes.
 *  - `rightRef`    → the far-items group; its width is subtracted from
 *                     the toolbar width to get the available space for
 *                     regular items.
 *  - `measureRef`  → a hidden mirror (`visibility:hidden; overflow:visible`)
 *                     that always renders ALL items so each child's true
 *                     unclipped width can be read.
 *
 * @returns The index in the flat item list at which items start to overflow.
 */
export function useOverflowIndex(toolbarRef, rightRef, measureRef, itemCount, moreButtonWidth) {
    if (moreButtonWidth === void 0) { moreButtonWidth = 48; }
    var _a = React.useState(itemCount), overflowIndex = _a[0], setOverflowIndex = _a[1];
    React.useEffect(function () {
        var toolbarEl = toolbarRef.current;
        var rightEl = rightRef.current;
        var measureEl = measureRef.current;
        if (!toolbarEl || !measureEl)
            return;
        var calculate = function () {
            var toolbarWidth = toolbarEl.offsetWidth;
            if (toolbarWidth === 0)
                return;
            var toolbarStyle = getComputedStyle(toolbarEl);
            var paddingLeft = parseFloat(toolbarStyle.paddingLeft || '0');
            var paddingRight = parseFloat(toolbarStyle.paddingRight || '0');
            var toolbarGap = parseFloat(toolbarStyle.columnGap || toolbarStyle.gap || '0');
            var minGap = getMinGap(toolbarWidth);
            var rightWidth = rightEl ? rightEl.offsetWidth : 0;
            var rightReserved = rightWidth > 0 ? rightWidth + minGap + toolbarGap : 0;
            var availableWidth = toolbarWidth - paddingLeft - paddingRight - rightReserved;
            if (availableWidth <= 0)
                return;
            var children = Array.from(measureEl.children);
            if (children.length === 0) {
                setOverflowIndex(itemCount);
                return;
            }
            var gap = parseFloat(getComputedStyle(measureEl).columnGap || '0');
            // Total width of all items in the unclipped mirror
            var totalWidth = 0;
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                totalWidth += child.offsetWidth;
            }
            totalWidth += Math.max(0, children.length - 1) * gap;
            // If everything fits, show all
            if (totalWidth <= availableWidth) {
                setOverflowIndex(children.length);
                return;
            }
            // Otherwise, find how many fit leaving room for the "..." button
            var budgetWidth = availableWidth - moreButtonWidth;
            var usedWidth = 0;
            var fitCount = 0;
            for (var i = 0; i < children.length; i++) {
                var childWidth = children[i].offsetWidth;
                var withGap = i > 0 ? gap : 0;
                if (usedWidth + withGap + childWidth > budgetWidth)
                    break;
                usedWidth += withGap + childWidth;
                fitCount++;
            }
            setOverflowIndex(Math.max(1, fitCount));
        };
        var rafId = requestAnimationFrame(calculate);
        var ro = new ResizeObserver(calculate);
        ro.observe(toolbarEl);
        return function () {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, [toolbarRef, rightRef, measureRef, itemCount, moreButtonWidth]);
    return overflowIndex;
}
//# sourceMappingURL=useOverflowIndex.js.map