import { __spreadArray } from "tslib";
import * as React from 'react';
import { ToolbarButton, ToolbarDivider, Tooltip, Badge, Text, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, } from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { useListToolbarStyles } from './useListToolbarStyles';
import { useOverflowIndex } from './useOverflowIndex';
import { ToolbarItemRenderer } from './ToolbarItemRenderer';
import { groupItems, flattenWithDividers } from './helpers';
/* ------------------------------------------------------------------ */
/*  ListToolbar — main component                                      */
/* ------------------------------------------------------------------ */
export var ListToolbar = function (_a) {
    var items = _a.items, _b = _a.farItems, farItems = _b === void 0 ? [] : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, _d = _a.ariaLabel, ariaLabel = _d === void 0 ? 'Toolbar' : _d, totalCount = _a.totalCount, className = _a.className, _e = _a.showGroupDividers, showGroupDividers = _e === void 0 ? true : _e;
    var styles = useListToolbarStyles();
    var toolbarRef = React.useRef(null);
    var leftRef = React.useRef(null);
    var rightRef = React.useRef(null);
    var measureRef = React.useRef(null);
    // ---- Separate regular vs far items ----
    var regularItems = React.useMemo(function () { return items.filter(function (i) { return !i.isFarItem && i.visible !== false; }); }, [items]);
    var allFarItems = React.useMemo(function () {
        var fromItems = items.filter(function (i) { return i.isFarItem && i.visible !== false; });
        var fromFar = farItems.filter(function (i) { return i.visible !== false; });
        return __spreadArray(__spreadArray([], fromItems, true), fromFar, true);
    }, [items, farItems]);
    var groupedFarItems = React.useMemo(function () { return groupItems(allFarItems); }, [allFarItems]);
    // ---- Build flat list of regular items (items + dividers) ----
    var flatItems = React.useMemo(function () { return flattenWithDividers(regularItems, showGroupDividers); }, [regularItems, showGroupDividers]);
    // ---- Custom overflow detection ----
    var overflowIndex = useOverflowIndex(toolbarRef, rightRef, measureRef, flatItems.length);
    // Determine which actual items (not dividers) are hidden
    var visibleItemKeys = React.useMemo(function () {
        var keys = new Set();
        for (var i = 0; i < overflowIndex && i < flatItems.length; i++) {
            if (flatItems[i].type === 'item') {
                keys.add(flatItems[i].key);
            }
        }
        return keys;
    }, [flatItems, overflowIndex]);
    var hiddenItems = React.useMemo(function () { return regularItems.filter(function (item) { return !visibleItemKeys.has(item.key); }); }, [regularItems, visibleItemKeys]);
    var hasOverflow = hiddenItems.length > 0;
    // ---- Render far items ----
    var renderFarGroup = function (groupItemsList, groupIndex, isLastGroup) {
        var elements = [];
        for (var _i = 0, groupItemsList_1 = groupItemsList; _i < groupItemsList_1.length; _i++) {
            var item = groupItemsList_1[_i];
            if (item.dividerBefore) {
                elements.push(React.createElement(ToolbarDivider, { key: "".concat(item.key, "-divider-before") }));
            }
            elements.push(React.createElement(ToolbarItemRenderer, { key: item.key, item: item, isLoading: isLoading, itemClass: styles.farItemButton, labelClass: styles.farItemLabel }));
            if (item.dividerAfter) {
                elements.push(React.createElement(ToolbarDivider, { key: "".concat(item.key, "-divider-after") }));
            }
        }
        if (showGroupDividers && !isLastGroup) {
            elements.push(React.createElement(ToolbarDivider, { key: "group-divider-".concat(groupIndex) }));
        }
        return elements;
    };
    return (React.createElement("div", { ref: toolbarRef, role: "toolbar", "aria-label": ariaLabel, className: "".concat(styles.toolbar, " ").concat(className || '') },
        React.createElement("div", { ref: measureRef, className: styles.measureSection, "aria-hidden": "true" }, flatItems.map(function (flat) {
            if (flat.type === 'divider') {
                return React.createElement(ToolbarDivider, { key: flat.key });
            }
            return (React.createElement(ToolbarItemRenderer, { key: flat.key, item: flat.item, isLoading: isLoading, itemClass: styles.toolbarItem }));
        })),
        React.createElement("div", { ref: leftRef, className: styles.leftSection },
            flatItems.map(function (flat, idx) {
                if (idx >= overflowIndex)
                    return null;
                if (flat.type === 'divider') {
                    return React.createElement(ToolbarDivider, { key: flat.key });
                }
                return (React.createElement(ToolbarItemRenderer, { key: flat.key, item: flat.item, isLoading: isLoading, itemClass: styles.toolbarItem }));
            }),
            hasOverflow && (React.createElement(Menu, null,
                React.createElement(MenuTrigger, { disableButtonEnhancement: true },
                    React.createElement(Tooltip, { content: "".concat(hiddenItems.length, " more actions"), relationship: "label" },
                        React.createElement(ToolbarButton, { className: styles.overflowButton, icon: React.createElement(MoreHorizontalRegular, null), "aria-label": "".concat(hiddenItems.length, " more actions") }))),
                React.createElement(MenuPopover, null,
                    React.createElement(MenuList, null, hiddenItems.map(function (item) { return (React.createElement(MenuItem, { key: item.key, icon: item.icon, disabled: item.disabled || isLoading, onClick: item.onClick }, item.label || item.tooltip || item.key)); }))))),
            totalCount !== undefined && totalCount > 0 && (React.createElement(Badge, { appearance: "filled", color: "informative", className: styles.countBadge },
                React.createElement(Text, { size: 200 },
                    totalCount,
                    " items")))),
        React.createElement("div", { ref: rightRef, className: styles.rightGroup }, allFarItems.length > 0 && (React.createElement("div", { className: styles.farItemsContainer }, Array.from(groupedFarItems.entries()).map(function (_a, groupIndex) {
            var _groupName = _a[0], groupItemsList = _a[1];
            return renderFarGroup(groupItemsList, groupIndex, groupIndex === groupedFarItems.size - 1);
        }))))));
};
export default ListToolbar;
//# sourceMappingURL=ListToolbarControl.js.map